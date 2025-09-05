import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../../utils/types';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
import { getCookie } from '../../../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  passwordResetRequested: boolean;
  passwordResetCompleted: boolean;
};

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  passwordResetRequested: false,
  passwordResetCompleted: false
};

// Регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      return res.user; // вернём только данные пользователя
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Логин
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Забыли пароль
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
      return true; // просто флаг успеха
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Сброс пароля
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
      return true;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Профиль — получить данные
export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Профиль — обновить данные
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Выход
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      console.log(localStorage.getItem('refreshToken'));
      console.log(getCookie('accessToken'));
      return true;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }
  },
  extraReducers: (builder) => {
    // Регистрация
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });

    // Логин
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });

    // Забыли пароль
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordResetRequested = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetRequested = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });

    // Сброс пароля
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordResetCompleted = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetCompleted = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });

    // Получить профиль
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.isAuthenticated = false;
      });

    // Обновить профиль
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });

    // Выход
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      });
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
