import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import styled from 'rn-css';
import FlexBox from './FlexBox';
import AppModal from './AppModal';
import {colors} from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {language} from '../utils/contsants';
import {UserActions} from '../redux/slice/user-slice';
import {AppText} from './AppText';
import {getString, initLanguage} from '../utils/locales/string';
import {asyncStorageFunctions} from '../utils/asyncStorage';

const languages = [
  {
    name: language.FR,
    img: require('../assets/img/france_big.png'),
  },
  {
    name: language.PL,
    img: require('../assets/img/poland_big.png'),
  },
  {
    name: language.ES,
    img: require('../assets/img/spain_big.png'),
  },
  {
    name: language.EN,
    img: require('../assets/img/uk_big.png'),
  },
];

export const FlagSwitcher = () => {
  const [showModal, setShowModal] = useState(false);
  const userLanguage = useAppSelector(state => state.user.userLanguage);
  const currentLearningLanguage = useAppSelector(
    state => state.user.currentLearningLanguage,
  );
  const dispatch = useAppDispatch();
  const handleSetUserLanguage = (lng: language) => {
    dispatch(UserActions.setUserLanguage(lng));
    asyncStorageFunctions.setAppLanguage(lng);
    initLanguage(lng);
  };
  const handleSetCurrentLearningLanguage = (lng: language) => {
    dispatch(UserActions.setCurrentLearningLanguage(lng));
  };
  return (
    <Wrapper>
      <LinearGradient
        style={{
          width: 54,
          height: 54,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}
        colors={[colors.purple, colors.white]}>
        <Item onPress={() => setShowModal(true)}>
          <Image
            source={languages.filter(x => x.name === userLanguage)[0].img}
            style={{
              height: '150%',
              width: '150%',
            }}
          />
        </Item>
      </LinearGradient>
      {showModal && (
        <AppModal onClose={() => setShowModal(false)}>
          <ModalWrapper>
            <AppText center size="t20" weight="bold">
              {getString('home', 'changeUserLanguage')}
            </AppText>
            <Wrapper>
              {languages.map(lng => (
                <FlagBox
                  key={lng.name}
                  onPress={() => handleSetUserLanguage(lng.name)}
                  active={userLanguage === lng.name}>
                  <Image
                    source={lng.img}
                    style={{
                      height: '110%',
                      width: '110%',
                      resizeMode: 'cover',
                      marginLeft: '-5%',
                    }}
                  />
                </FlagBox>
              ))}
            </Wrapper>
            <AppText center size="t20" weight="bold">
              {getString('home', 'changeLearningLanguage')}
            </AppText>
            <Wrapper>
              {languages
                .filter(x => x.name !== userLanguage)
                .map(lng => (
                  <FlagBox
                    key={lng.name}
                    onPress={() => handleSetCurrentLearningLanguage(lng.name)}
                    active={currentLearningLanguage === lng.name}>
                    <Image
                      source={lng.img}
                      style={{
                        height: '110%',
                        width: '110%',
                        resizeMode: 'cover',
                        marginLeft: '-5%',
                      }}
                    />
                  </FlagBox>
                ))}
            </Wrapper>
          </ModalWrapper>
        </AppModal>
      )}
    </Wrapper>
  );
};
const Item = styled(TouchableOpacity)`
  height: 36px;
  width: 36px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid white;
`;
const Wrapper = styled(FlexBox)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
  margin-top: 15px;
`;
const FlagBox = styled(TouchableOpacity)<{active?: boolean}>`
  width: 45%;
  height: 100;
  border-radius: 25px;
  margin-top: 15px;
  overflow: hidden;
  border: ${p => (p.active ? '5px solid ' + colors.black : 'none')};
`;
const ModalWrapper = styled(FlexBox)`
  flex-direction: column;
`;
