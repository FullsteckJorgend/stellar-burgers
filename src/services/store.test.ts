import store from './store';

describe('store', () => {
  it('должен корректно инициализировать rootReducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
  });
});
