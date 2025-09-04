import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';

type BurgerConstructorState = {
  bun: Pick<TIngredient, '_id'> | null;
  ingredients: TConstructorIngredient[];
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (
      state,
      action: PayloadAction<TIngredient | TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = { _id: action.payload._id };
      } else {
        state.ingredients.push(action.payload as TConstructorIngredient);
      }
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index - 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index - 1]
        ];
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index + 1], state.ingredients[index]] = [
          state.ingredients[index],
          state.ingredients[index + 1]
        ];
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
