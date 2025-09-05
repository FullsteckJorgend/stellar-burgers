import { rootReducer } from './store';
import { initialState as ingredientsInitial } from './slice/ingredients/ingredientsSlice';
import { initialState as constructorInitial } from './slice/constructor/constructorSlice';
import { initialState as userInitial } from './slice/user/userSlice';
import { initialState as orderInitial } from './slice/order/orderSlice';
import { initialState as feedInitial } from './slice/feed/feedSlice';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: ingredientsInitial,
      burgerConstructor: constructorInitial,
      user: userInitial,
      order: orderInitial,
      feed: feedInitial,
    });
  });
});
