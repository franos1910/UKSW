import React, {useEffect, useState} from 'react';
import styled from 'rn-css';
import FlexBox from '../../../ui/FlexBox';
import {colors, shadow} from '../../../utils/theme';
import {AppText} from '../../../ui/AppText';
import {getString} from '../../../utils/locales/string';
import Column from '../../../ui/Column';
import {Touchable} from 'react-native';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {Svg, Circle} from 'react-native-svg';
import {useAppSelector} from '../../../redux/store';
import {useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const ImageSize = width * 0.15;
const CIRCLE_LENGTH = width * 0.7;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const HomeScreenCard = ({
  id,
  img,
  onPress,
  name,
}: {
  id: string;
  name: 'home' | 'sport';
  img: any;
  onPress: () => void;
}) => {
  const currentLearningLanguage = useAppSelector(
    state => state.user.currentLearningLanguage,
  );
  const appLanguage = useAppSelector(state => state.user.userLanguage);
  const data = useAppSelector(state => state.user.progress);
  const [info, setInfo] = useState([]);
  const progress = useSharedValue(0);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));
  const isFocused = useIsFocused();

  useEffect(() => {
    const i = data[currentLearningLanguage].filter(
      x => x.categoryName === name,
    );
    setInfo(i);
    console.log(i);
  }, [data, isFocused, currentLearningLanguage]);

  useEffect(() => {
    progress.value = withTiming(
      info[0] ? info[0].userPoints / info[0].size : 0,
      {duration: 2000},
    );
    return () => {
      progress.value = 0;
    };
  }, [data, currentLearningLanguage, appLanguage, progress, info]);
  return info.length > 0 ? (
    <Wrapper onPress={onPress} style={shadow.shadow1}>
      <Column>
        <Svg
          fill="none"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Circle
            cx={R + ImageSize / 4}
            cy={R + ImageSize / 4}
            stroke={colors.gray + '60'}
            strokeWidth={5}
            strokeDasharray={CIRCLE_LENGTH}
            r={R}
            strokeLinecap={'round'}
          />
          <AnimatedCircle
            cx={R + ImageSize / 4}
            cy={R + ImageSize / 4}
            stroke={colors.green}
            strokeWidth={5}
            strokeDasharray={CIRCLE_LENGTH}
            r={R}
            animatedProps={animatedProps}
            strokeLinecap={'round'}
          />
        </Svg>
        <SharedElement
          id={`item.${id}.img`}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.3,
            height: width * 0.3,
          }}>
          <Animated.Image
            style={{width: ImageSize, height: ImageSize}}
            source={img}
          />
        </SharedElement>

        <AppText size="t16">{getString('home', name)}</AppText>

        <AppText size="t14" color="gray">
          {(info[0].userPoints / info[0].size) * 100}%{' '}
          {getString('home', 'completed')}
        </AppText>
      </Column>
    </Wrapper>
  ) : (
    <Wrapper
      onPress={onPress}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
      }}>
      <Column>
        <Svg
          fill="none"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Circle
            cx={R + ImageSize / 4}
            cy={R + ImageSize / 4}
            stroke={colors.gray + '60'}
            strokeWidth={5}
            strokeDasharray={CIRCLE_LENGTH}
            r={R}
            strokeLinecap={'round'}
          />
        </Svg>
        <SharedElement
          id={`item.${id}.img`}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.3,
            height: width * 0.3,
          }}>
          <Animated.Image
            style={{width: ImageSize, height: ImageSize}}
            source={img}
          />
        </SharedElement>

        <AppText size="t16">{getString('home', name)}</AppText>
        <AppText size="t14">{getString('home', 'startLearning')}</AppText>
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(TouchableOpacity)`
  width: ${width * 0.4};
  height: ${width * 0.5};
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  margin: ${width * 0.05};
`;

export default HomeScreenCard;
