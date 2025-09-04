import { getIngredientsApi } from '../../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, thunkAPI) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Неизвестная ошибка');
  }
});

const initialState: TIngredientsState = {
  items: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      });
  }
});

export default ingredientsSlice.reducer;
