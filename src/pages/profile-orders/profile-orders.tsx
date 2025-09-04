import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slice/order/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
