import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearCurrentOrder, createOrder } from '../../services/orderSlice';
import { clearConstructor } from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const allIngredients = useSelector((state) => state.ingredients.items);

  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const orderRequest = useSelector((state) => state.order.loading);
  const orderModalData = useSelector((state) => state.order.currentOrder);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: bun ? allIngredients.find((item) => item._id === bun._id) : null,
    ingredients
  };

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else {
      dispatch(
        createOrder(
          [bun?._id, ...ingredients.map((item) => item._id), bun?._id].filter(
            (id): id is string => Boolean(id)
          )
        )
      );
      dispatch(clearConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
