import orderReducer, {
  createOrder,
  fetchOrders,
  fetchOrderByNumber,
  clearCurrentOrder
} from './orderSlice';

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  };

  const order = {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2025-09-03T10:00:00.000Z',
    updatedAt: '2025-09-03T10:00:00.000Z',
    number: 123,
    ingredients: ['a', 'b']
  };

  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('pending createOrder: loading=true, error=null', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled createOrder: currentOrder обновляется, loading=false', () => {
    const action = { type: createOrder.fulfilled.type, payload: order };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(order);
  });

  it('rejected createOrder: error=payload, loading=false', () => {
    const action = { type: createOrder.rejected.type, payload: 'Ошибка' };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('pending fetchOrders: loading=true, error=null', () => {
    const action = { type: fetchOrders.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled fetchOrders: orders обновляются, loading=false', () => {
    const orders = [order];
    const action = { type: fetchOrders.fulfilled.type, payload: orders };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('rejected fetchOrders: error=payload, loading=false', () => {
    const action = { type: fetchOrders.rejected.type, payload: 'Ошибка' };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('pending fetchOrderByNumber: loading=true, error=null', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled fetchOrderByNumber: currentOrder обновляется, loading=false', () => {
    const action = { type: fetchOrderByNumber.fulfilled.type, payload: order };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.currentOrder).toEqual(order);
  });

  it('rejected fetchOrderByNumber: error=payload, loading=false', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: 'Ошибка'
    };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('clearCurrentOrder: currentOrder=null', () => {
    const action = { type: clearCurrentOrder.type };
    const state = orderReducer(
      { ...initialState, currentOrder: order },
      action
    );
    expect(state.currentOrder).toBeNull();
  });
});
