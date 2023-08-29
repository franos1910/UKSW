import React, {useEffect} from 'react';
import styled from 'rn-css';
import FlexBox from '../../../ui/FlexBox';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList, Image, View, ViewToken, TouchableOpacity} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {AppText} from '../../../ui/AppText';
import {getString} from '../../../utils/locales/string';
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
import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {colors} from '../../../utils/theme';
import {
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolate,
} from 'react-native-reanimated';
import {Circle, Svg} from 'react-native-svg';
import {GameActions} from '../../../redux/slice/game-slice';

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

export const CategoryScreen = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {data, imgName} = route.params;
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

  const BtnAnimation = useAnimatedStyle(() => {
    return {
      borderRadius: btnAnimationProgress.value * 60,
    };
  }, []);

  useEffect(() => {
    btnAnimationProgress.value = withDelay(
      1000,
      withRepeat(withTiming(0.7, {duration: 2000}), -1, true),
    );
  }, []);

  return (
    <Wrapper>
      <SharedElement
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 25,
        }}
        id={`item.${route.params.id}.img`}>
        <Image style={{width: 200, height: 200}} source={imgName} />
      </SharedElement>
      <Animated.View
        entering={FadeInLeft.delay(300)}
        style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
        <AppText size="t32" weight="light">
          {getString('home', 'category')}:
        </AppText>
        <Animated.View entering={FlipInEasyX.delay(700)}>
          <AppText style={{marginLeft: 5}} size="t40">
            {getString('home', data[0].category)}
          </AppText>
        </Animated.View>
      </Animated.View>
      <Words>
        <Animated.FlatList
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
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
      </Words>
      <StartButton
        onPress={() => {
          dispatch(GameActions.setCurrentCategory(data[0].category));
          navigation.navigate('Game');
        }}>
        <Animated.View
          entering={FadeInRight.delay(1000).duration(500)}
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: colors.red,
              justifyContent: 'center',
              alignItems: 'center',
            },
            BtnAnimation,
          ]}>
          <AppText color="white" size="t24">
            Start
          </AppText>
        </Animated.View>
      </StartButton>
    </Wrapper>
  );
};
CategoryScreen.sharedElements = route => {
  const {id} = route.params;
  return [`item.${id}.img`, `item.${id}.name`];
};

const StartButton = styled(TouchableOpacity)`
  position: absolute;
  height: 100px;
  width: 100px;
  bottom: 50;
  right: 15;
`;
const Words = styled(FlexBox)`
  flex-direction: column;
`;
const Wrapper = styled(FlexBox)`
  border-top-right-radius: 150;
  border-top-left-radius: 150;
  background-color: white;
  flex-direction: column;
  flex: 1;
`;
