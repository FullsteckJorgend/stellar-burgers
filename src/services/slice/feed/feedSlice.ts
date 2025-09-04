import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';

type TOrderFeed = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TFeedsResponse = {
  success: boolean;
  orders: TOrderFeed[]; // тут лучше описать интерфейс заказа
  total: number;
  totalToday: number;
};

type TFeedsState = {
  orders: TOrderFeed[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: Error | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<TFeedsResponse>(
  'feeds/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err); // отдаём сам объект Error
      }
      return rejectWithValue(new Error('Unknown error'));
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload instanceof Error
            ? action.payload
            : new Error('Ошибка загрузки');
      });
  }
});

export default feedsSlice.reducer;
