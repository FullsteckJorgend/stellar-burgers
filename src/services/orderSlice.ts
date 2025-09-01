import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { clearConstructor } from './constructorSlice';
import { useDispatch } from 'react-redux';

type OrderState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

// Создание заказа
export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/create', async (ingredients, { rejectWithValue }) => {
  try {
    const res = await orderBurgerApi(ingredients);
    return res.order as TOrder;
  } catch (err) {
    return rejectWithValue('Не удалось создать заказ');
  }
});

// Все заказы пользователя
export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error) {
    return rejectWithValue('Не удалось загрузить заказы');
  }
});

// Заказ по номеру
export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchByNumber', async (number, { rejectWithValue }) => {
  try {
    const res = await getOrderByNumberApi(number);
    return res.orders[0] as TOrder;
  } catch (err) {
    return rejectWithValue('Не удалось загрузить заказ');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка при создании заказа';
      })

      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка при загрузке заказов';
      })

      // fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка при загрузке заказа';
      });
  }
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
