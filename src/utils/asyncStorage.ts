import AsyncStorage from '@react-native-async-storage/async-storage';

export namespace asyncStorageFunctions {
  export interface UserInfo {
    appLanguage: string;
    age: string;
    name: string;
    description: string;
  }
  export const setUserInfo = async (data: UserInfo) => {
    try {
      await AsyncStorage.setItem('userName', data.name);
      await AsyncStorage.setItem('userAge', data.age);
      await AsyncStorage.setItem('description', data.description);
      await AsyncStorage.setItem('appLanguage', data.appLanguage);
    } catch (e) {
      console.log(e);
    }
  };

  export const setGameInfo = async (key: string, value: string) => {
    try {
      console.log(key);
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };
  export const setAppLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('appLanguage', lang);
    } catch (e) {
      console.log(e);
    }
  };
  export const getUserInfo = async () => {
    try {
      const res = await AsyncStorage.multiGet([
        'userName',
        'userAge',
        'description',
        'appLanguage',
      ]);
      const userInfo = {
        userName: '',
        userAge: '',
        description: '',
        appLanguage: '',
      };
      res.forEach(([key, value]) => {
        userInfo[key] = value;
      });
      return userInfo;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  export const getGameInfo = async () => {
    try {
      const res = await AsyncStorage.multiGet([
        'sport_en',
        'home_en',
        'sport_fr',
        'home_fr',
        'sport_es',
        'home_es',
        'sport_pl',
        'home_pl',
      ]);
      const gameInfo = {
        sport_en: 0,
        home_en: 0,
        sport_fr: 0,
        home_fr: 0,
        sport_es: 0,
        home_es: 0,
        sport_pl: 0,
        home_pl: 0,
      };
      res.forEach(([key, value]) => {
        gameInfo[key] = value;
      });
      return gameInfo;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
}
