import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MainState {
  token: string | null;
}

const initialState: MainState = {
  token: null,
};

export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearSession: state => {},
  },
});

export const MainActions = MainSlice.actions;
export const MainReducer = MainSlice.reducer;
