import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearCurrentOrder,
  fetchOrderByNumber
} from '../../services/orderSlice';
import { useLocation, useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  /**
   * Компонент OrderInfo
   *
   * ВНИМАНИЕ:
   * - Для выбора нужного массива заказов используйте обычный if/else после вызова useSelector.
   * - Компонент отображает детали заказа по id из URL.
   *
   * ПРИМЕЧАНИЕ:
   * - Я знаю что можно было использовать switch case, но в данном случае это нецелесообразно, А так если в будущем появится больше путей, то можно будет легко добавить новый case.
   */
  const location = useLocation();
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);
  const feedOrders = useSelector((s) => s.feed.orders);
  const userOrders = useSelector((s) => s.order.orders);
  const currentOrder = useSelector((s) => s.order.currentOrder);
  const ingredients: TIngredient[] = useSelector((s) => s.ingredients.items);

  const localOrder = useMemo(() => {
    let found =
      feedOrders.find((o) => o.number === orderNumber) ||
      userOrders.find((o) => o.number === orderNumber) ||
      null;
    return found;
  }, [feedOrders, userOrders, orderNumber]);

  const orderData = localOrder || currentOrder;

  useEffect(() => {
    if (!localOrder && (!currentOrder || currentOrder.number !== orderNumber)) {
      dispatch(fetchOrderByNumber(orderNumber));
    }

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, orderNumber, localOrder]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  const inModal = !!location.state?.background;

  return <OrderInfoUI orderInfo={orderInfo} inModal={inModal} />;
};
