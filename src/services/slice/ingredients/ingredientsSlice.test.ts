import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('pending: loading=true, error=null', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: items обновляются, loading=false', () => {
    const items = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: items };
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(items);
  });

  it('rejected: error=payload, loading=false', () => {
    const action = { type: fetchIngredients.rejected.type, payload: 'Ошибка' };
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('rejected: error=Ошибка загрузки, loading=false если payload не передан', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
