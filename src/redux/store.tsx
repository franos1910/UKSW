import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  Reducer,
  CombinedState,
  AnyAction,
} from '@reduxjs/toolkit';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import {MainReducer, MainState} from './slice/main-slice';
import {UserReducer, UserState} from './slice/user-slice';
import {GameReducer, GameState} from './slice/game-slice';

type ReducerT = Reducer<
  CombinedState<{
    main: MainState;
    user: UserState;
    game: GameState;
  }>,
  AnyAction
>;

const combinedReducer = combineReducers<ReducerT>({
  main: MainReducer,
  user: UserReducer,
  game: GameReducer,
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<ReducerT>;
export type AppDispatch = typeof store.dispatch;
export default store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
