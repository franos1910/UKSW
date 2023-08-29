import React from 'react';
import {FlatList, View} from 'react-native';
import {
  FadeInLeft,
  FlipInEasyX,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withTiming,
  FadeInRight,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolate,
} from 'react-native-reanimated';
import {useAppSelector} from '../../../redux/store';
import {colors} from '../../../utils/theme';
import {AppText} from '../../../ui/AppText';
import {useState, useEffect} from 'react';
import home_data from '../../../assets/json/home.json';
import sport_data from '../../../assets/json/sport.json';
import HeaderBar from '../../../ui/HeaderBar';
import AppButton from '../../../ui/AppButton';
import {getString} from '../../../utils/locales/string';

const RenderItem = ({
  item,
  index,
  scrollY,
  userLanguage,
  currentLearningLanguage,
}: any) => {
  const itemOpacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    itemOpacity.value = interpolate(
      scrollY.value,
      [(index - 1) * 70, index * 70, (index + 1) * 70],
      [1, 1, 0],
    );
    return {
      opacity: itemOpacity.value,
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: 60,
          backgroundColor: index % 2 === 0 ? colors.purple : colors.green,
          marginBottom: 10,
          padding: 15,
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
        },
        animatedStyle,
      ]}>
      <AppText size="t20" weight="bold">
        {item[userLanguage]}{' '}
      </AppText>
      <AppText size="t16" weight="light">
        {' '}
        {item[currentLearningLanguage]}
      </AppText>
    </Animated.View>
  );
};

function KnownWords() {
  const btnAnimationProgress = useSharedValue(1);
  const scrollY = useSharedValue(0);
  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = event.contentOffset.y;
      scrollY.value = y;
    },
  });
  const userLanguage = useAppSelector(state => state.user.userLanguage);
  const currentLearningLanguage = useAppSelector(
    state => state.user.currentLearningLanguage,
  );
  const progress = useAppSelector(state => state.user.progress);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(currentLearningLanguage);

  useEffect(() => {
    const sportPoints = progress[language].find(
      x => x.categoryName === 'sport',
    ).userPoints;
    const homePoints = progress[language].find(
      x => x.categoryName === 'home',
    ).userPoints;
    console.log(sportPoints);
    const newSportData = sport_data.data.filter((item, index) => {
      if (index < sportPoints) return item;
    });
    const newHomeData = home_data.data.filter((item, index) => {
      if (index < homePoints) return item;
    });
    console.log(newSportData);
    setData(newSportData.concat(newHomeData));
  }, [language]);
  return (
    <View style={{height: '85%'}}>
      <HeaderBar text={getString('profile', 'knownWords')} />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <AppButton
          text={getString('profile', 'en')}
          onPress={() => setLanguage('en')}
        />
        <AppButton
          text={getString('profile', 'pl')}
          onPress={() => setLanguage('pl')}
        />
        <AppButton
          text={getString('profile', 'es')}
          onPress={() => setLanguage('es')}
        />
        <AppButton
          text={getString('profile', 'fr')}
          onPress={() => setLanguage('fr')}
        />
      </View>
      {data.length > 0 ? (
        <View>
          <Animated.FlatList
            scrollEventThrottle={16}
            keyExtractor={item => item}
            onScroll={handler}
            data={data}
            contentContainerStyle={{
              padding: 15,
            }}
            renderItem={({item, index}) => (
              <RenderItem
                item={item}
                index={index}
                scrollY={scrollY}
                userLanguage={userLanguage}
                currentLearningLanguage={currentLearningLanguage}
              />
            )}
          />
        </View>
      ) : (
        <AppText>{getString('profile', 'uDontKnowWords')}</AppText>
      )}
    </View>
  );
}

export default KnownWords;
