import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {language} from '../../utils/contsants';

export interface UserState {
  userInfo: {
    name: string;
    age: string;
    desc: string;
  };
  userLanguage: 'pl' | 'en' | 'es' | 'fr';
  currentLearningLanguage: 'en';
  progress: {
    en: [
      {
        categoryName: string;
        size: number;
        userPoints: number;
      },
    ];
  };
}

const initialState: UserState = {
  userInfo: {
    name: '',
    age: '',
    desc: '',
  },
  progress: {
    en: [
      {
        categoryName: 'sport',
        size: 0,
        userPoints: 0,
      },
    ],
    es: null,
    fr: null,
    pl: null,
  },
  userLanguage: 'en',
  currentLearningLanguage: 'en',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSession: state => {},
    setUserLanguage: (state, action) => {
      state.userLanguage = action.payload;
    },
    setCurrentLearningLanguage: (state, action) => {
      state.currentLearningLanguage = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
