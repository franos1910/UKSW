import React from 'react';
import {FlagSwitcher} from '../../../ui/FlagSwitcher';
import FlexBox from '../../../ui/FlexBox';
import styled from 'rn-css';
import {getString} from '../../../utils/locales/string';
import {AppText} from '../../../ui/AppText';
import {colors} from '../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreenCard from '../components/HomeScreenCard';
import {useAppSelector} from '../../../redux/store';
import home_data from '../../../assets/json/home.json';
import sport_data from '../../../assets/json/sport.json';

export const CATEGORIES = [
  {
    name: 'home',
    img: require('../../../assets/img/home_big.png'),
    id: '1',
    data: home_data.data,
  },
  {
    name: 'sport',
    id: '2',
    img: require('../../../assets/img/sport_big.png'),
    data: sport_data.data,
  },
];

function HomeScreen({navigation}) {
  const userInfo = useAppSelector(state => state.user.userInfo);
  const progress = useAppSelector(state => state.user.progress);
  console.log(progress);
  const currentLearningLanguage = useAppSelector(
    state => state.user.currentLearningLanguage,
  );
  const appLanguage = useAppSelector(state => state.user.userLanguage);

  return (
    <Wrapper>
      <LinearGradient
        start={{x: 0.0, y: 0.1}}
        end={{x: 0.05, y: 1}}
        locations={[0, 0.6, 1]}
        style={{flex: 1}}
        colors={[colors.purple, colors.purple + '10', colors.white]}>
        <Row style={{justifyContent: 'flex-end'}}>
          <FlagWrapper>
            <FlagSwitcher />
          </FlagWrapper>
        </Row>
        <Row>
          <Column>
            <HeroText>
              {getString('home', 'hero_hi')}
              {userInfo.name}
            </HeroText>

            <HeroTextBig size="t40" weight="bold">
              {getString('home', 'hero_text')}
            </HeroTextBig>
            <HeroText>
              {getString('home', 'currentLearning')}
              {getString('home', currentLearningLanguage)}
            </HeroText>
          </Column>
        </Row>
        <CardsRow>
          {CATEGORIES.map(category => (
            <HomeScreenCard
              id={category.id}
              name={category.name}
              img={category.img}
              onPress={() =>
                navigation.navigate('Category', {
                  id: category.id,
                  data: category.data,
                  imgName: category.img,
                })
              }
            />
          ))}
        </CardsRow>
      </LinearGradient>
    </Wrapper>
  );
}

const FlagWrapper = styled(FlexBox)`
  padding-right: 1rem;
  padding-top: 2rem;
`;
const Wrapper = styled(FlexBox)`
  flex-direction: column;
  flex: 1;
`;
const Row = styled(FlexBox)`
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
`;
const CardsRow = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
`;
const Column = styled(FlexBox)`
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
const HeroText = styled(AppText)`
  color: white;
`;
const HeroTextBig = styled(AppText)`
  color: white;
`;

export default HomeScreen;
