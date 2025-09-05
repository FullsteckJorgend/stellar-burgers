import constructorReducer, {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';

describe('unit-тесты для всех редьюсеров constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun1',
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
  };
  const ingredient1: TConstructorIngredient = {
    id: 'test-id1',
    _id: 'id1',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 5,
    calories: 100,
    price: 80,
    image: '',
    image_mobile: '',
    image_large: ''
  };
  const ingredient2: TConstructorIngredient = {
    id: 'test-id2',
    _id: 'id2',
    name: 'Сыр',
    type: 'main',
    proteins: 5,
    fat: 8,
    carbohydrates: 2,
    calories: 50,
    price: 30,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('should handle addIngredient (bun)', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual({ _id: 'bun1' });
    expect(state.ingredients).toEqual([]);
  });

  it('should handle addIngredient (main)', () => {
    const state = constructorReducer(undefined, addIngredient(ingredient1));
    expect(state.ingredients).toEqual([ingredient1]);
  });

  it('should handle moveIngredientUp', () => {
    const startState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(startState, moveIngredientUp(1));
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('should not move up if index is 0', () => {
    const startState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(startState, moveIngredientUp(0));
    expect(state.ingredients).toEqual([ingredient1, ingredient2]);
  });

  it('should handle moveIngredientDown', () => {
    const startState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(startState, moveIngredientDown(0));
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('should not move down if index is last', () => {
    const startState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(startState, moveIngredientDown(1));
    expect(state.ingredients).toEqual([ingredient1, ingredient2]);
  });

  it('should handle removeIngredient', () => {
    const startState = { bun: null, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(startState, removeIngredient(0));
    expect(state.ingredients).toEqual([ingredient2]);
  });

  it('should handle clearConstructor', () => {
    const startState = {
      bun: { _id: 'bun1' },
      ingredients: [ingredient1, ingredient2]
    };
    const state = constructorReducer(startState, clearConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
