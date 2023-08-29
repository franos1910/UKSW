import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GameState {
  currentCategory: string | null;
}

const initialState: GameState = {
  currentCategory: null,
};

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const GameActions = GameSlice.actions;
export const GameReducer = GameSlice.reducer;
