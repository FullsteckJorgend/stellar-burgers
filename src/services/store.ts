import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './ingredientsSlice';
import constructorReduсer from './constructorSlice';
import userSliceReducer from './userSlice';
import orderReducer from './orderSlice';
import feedReducer from './feedSlice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReduсer,
  user: userSliceReducer,
  order: orderReducer,
  feed: feedReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
