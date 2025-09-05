import feedsReducer, { fetchFeeds } from './feedSlice';

describe('feedsSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(feedsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('pending: loading=true, error=null', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: orders, total, totalToday обновляются, loading=false', () => {
    const orders = [
      {
        _id: '1',
        ingredients: ['a', 'b'],
        status: 'done',
        name: 'Order 1',
        createdAt: '2025-09-03T10:00:00.000Z',
        updatedAt: '2025-09-03T10:00:00.000Z',
        number: 123
      }
    ];
    const payload = {
      success: true,
      orders,
      total: 100,
      totalToday: 10
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = feedsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('rejected: error=Error, loading=false', () => {
    const error = new Error('Test error');
    const action = { type: fetchFeeds.rejected.type, payload: error };
    const state = feedsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('rejected: error=Error("Ошибка загрузки"), loading=false если payload строка', () => {
    const action = { type: fetchFeeds.rejected.type, payload: 'some error' };
    const state = feedsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBeInstanceOf(Error);
    expect(state.error?.message).toBe('Ошибка загрузки');
  });
});
