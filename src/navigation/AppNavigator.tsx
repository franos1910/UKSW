import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import HomeScreen from '../features/home/screens/HomeScreen';
import {CategoryScreen} from '../features/home/screens/CategoryScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import ProfileInfoScreen from '../features/profile/screens/ProfileInfoScreen';
import store from '../redux/store';
import {UserActions} from '../redux/slice/user-slice';
import {useEffect, useState} from 'react';
import {asyncStorageFunctions} from '../utils/asyncStorage';
import {initLanguage} from '../utils/locales/string';
import SplashScreen from './SplashScreen';
import GameScreen from '../features/game/screens/GameScreen';
import {data as home_data} from '../assets/json/home.json';
import {data as sport_data} from '../assets/json/sport.json';
import KnownWords from '../features/profile/screens/KnownWords';
import Icon from 'react-native-vector-icons/Ionicons';

const name = 'BottomTabs';

const BottomTab = createBottomTabNavigator();

const Stack1 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Stack2 = createSharedElementStackNavigator({
  name: 'stack2',
  debug: true,
});

const HomeStack = () => (
  <Stack1.Navigator screenOptions={{headerShown: false}}>
    <Stack1.Screen name="Home" component={HomeScreen} />
    <Stack1.Screen name="Category" component={CategoryScreen} />
    <Stack1.Screen name="Game" component={GameScreen} />
  </Stack1.Navigator>
);

const ProfileStack = () => (
  <Stack2.Navigator screenOptions={{headerShown: false}}>
    <Stack2.Screen name="profile" component={ProfileScreen} />
    <Stack2.Screen name="editProfile" component={ProfileInfoScreen} />
    <Stack2.Screen name="KnownWords" component={KnownWords} />
  </Stack2.Navigator>
);

export const AppNavigator = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await asyncStorageFunctions.getUserInfo();
        const gameData = await asyncStorageFunctions.getGameInfo();
        if (userData) {
          const userInfo = {
            name: userData.userName,
            age: userData.userAge,
            desc: userData.description,
          };
          store.dispatch(UserActions.setUserInfo(userInfo));
          store.dispatch(UserActions.setUserLanguage(userData.appLanguage));
          if (userData.appLanguage) {
            initLanguage(userData.appLanguage);
          } else {
            initLanguage('en');
          }
        }
        if (gameData) {
          const GameInfo = {
            sport_en: gameData.sport_en ? gameData.sport_en : 0,
            home_en: gameData.home_en,
            sport_pl: gameData.sport_pl,
            home_pl: gameData.home_pl,
            sport_fr: gameData.sport_fr,
            home_fr: gameData.home_fr,
            sport_es: gameData.sport_es,
            home_es: gameData.home_es,
          };

          store.dispatch(
            UserActions.setProgress({
              en: [
                {
                  categoryName: 'sport',
                  size: sport_data.length,
                  userPoints: GameInfo.sport_en,
                },
                {
                  categoryName: 'home',
                  size: home_data.length,
                  userPoints: GameInfo.home_en,
                },
              ],
              es: [
                {
                  categoryName: 'sport',
                  size: sport_data.length,
                  userPoints: GameInfo.sport_es,
                },
                {
                  categoryName: 'home',
                  size: home_data.length,
                  userPoints: GameInfo.home_es,
                },
              ],
              fr: [
                {
                  categoryName: 'sport',
                  size: sport_data.length,
                  userPoints: GameInfo.sport_fr,
                },
                {
                  categoryName: 'home',
                  size: home_data.length,
                  userPoints: GameInfo.home_fr,
                },
              ],
              pl: [
                {
                  categoryName: 'sport',
                  size: sport_data.length,
                  userPoints: GameInfo.sport_pl,
                },
                {
                  categoryName: 'home',
                  size: home_data.length,
                  userPoints: GameInfo.home_pl,
                },
              ],
            }),
          );
        }
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <NavigationContainer>
      {loaded ? (
        <BottomTab.Navigator screenOptions={{headerShown: false}}>
          <BottomTab.Screen
            options={{
              tabBarIcon: ({tintColor}) => <Icon name="home" size={20} />,
            }}
            name="HomeStack"
            component={HomeStack}
          />
          <BottomTab.Screen
            options={{
              tabBarIcon: ({tintColor}) => <Icon name="person" size={20} />,
            }}
            name="Profile"
            component={ProfileStack}
          />
        </BottomTab.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
};
