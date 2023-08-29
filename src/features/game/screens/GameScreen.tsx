import React, {useEffect, useState, useRef} from 'react';
import styled from 'rn-css';
import AppButton from '../../../ui/AppButton';
import HeaderBar from '../../../ui/HeaderBar';
import {FlatList} from 'react-native';
import {GameLogic} from '../logic/GameLogic';
import {AppText} from '../../../ui/AppText';
import {getString} from '../../../utils/locales/string';
import {Dimensions, Alert} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {UserActions} from '../../../redux/slice/user-slice';
import {asyncStorageFunctions} from '../../../utils/asyncStorage';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

const width = Dimensions.get('window').width;

const Question = ({data, handleAnswer, index}) => {
  const item = data;
  return item.type === 'WORD' ? (
    <QuestionWrapper>
      <AppText size="t18">{item.question}</AppText>
      <AppText size="t28">{item.newWord}</AppText>
      <TouchableOpacity onPress={() => Tts.speak(item.newWorld)}>
        <Icon name="sound" size={32} />
      </TouchableOpacity>
      <Btn2>
        <AppButton
          text={getString('game', 'next')}
          onPress={() => handleAnswer({type: 'WORD'})}
        />
      </Btn2>
    </QuestionWrapper>
  ) : (
    <QuestionWrapper>
      <AppText size="t28">{item.question}</AppText>
      <Row>
        <Btn>
          <AppButton
            text={item.answers[0]}
            onPress={() =>
              handleAnswer({
                type: item.type,
                answer: item.answers[0],
                index: index,
              })
            }
          />
        </Btn>
        <Btn>
          <AppButton
            text={item.answers[1]}
            onPress={() =>
              handleAnswer({
                type: item.type,
                answer: item.answers[1],
                index: index,
              })
            }
          />
        </Btn>
      </Row>
      <Row>
        <Btn>
          <AppButton
            text={item.answers[2]}
            onPress={() =>
              handleAnswer({
                type: item.type,
                answer: item.answers[2],
                index: index,
              })
            }
          />
        </Btn>
        <Btn>
          <AppButton
            text={item.answers[3]}
            onPress={() =>
              handleAnswer({
                type: item.type,
                answer: item.answers[3],
                index: index,
              })
            }
          />
        </Btn>
      </Row>
    </QuestionWrapper>
  );
};

function GameScreen() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const scrollIndex = useRef(0);
  const dispatch = useAppDispatch();
  const progress = useAppSelector(state => state.user.progress);
  const currentLearningLangueage = useAppSelector(
    state => state.user.currentLearningLanguage,
  );
  const currentCategory = useAppSelector(state => state.game.currentCategory);
  const scrollToNextItem = () => {
    if (scrollIndex.current < data.length - 1) {
      scrollIndex.current += 1;
      flatListRef.current.scrollToIndex({index: scrollIndex.current});
    } else {
      Alert.alert(getString('game', 'gameDone'));

      let newProgress = progress;

      const index = progress[currentLearningLangueage].findIndex(
        x => x.categoryName === currentCategory,
      );

      const points = data.filter(x => x.type === 'WORD').length;
      progress[currentLearningLangueage][index].userPoints =
        Number(progress[currentLearningLangueage][index].userPoints) + points;
      dispatch(UserActions.setProgress(newProgress));
      asyncStorageFunctions.setGameInfo(
        currentCategory + '_' + currentLearningLangueage,
        (
          Number(progress[currentLearningLangueage][index].userPoints) + points
        ).toString(),
      );
      navigation.goBack();
    }
  };
  const handleAnswer = vars => {
    if (vars.type === 'WORD') {
      scrollToNextItem();
    } else {
      if (data[vars.index].correctAnswer === vars.answer) {
        console.log('dobrze');
        scrollToNextItem();
      } else {
        console.log('zle');
      }
    }
  };
  useEffect(() => {
    const questions = GameLogic.getQuestions();
    setData(questions);
    console.log(questions);
  }, []);
  return (
    <Wrapper>
      <HeaderBar />
      {data && (
        <FlatList
          data={data}
          horizontal
          renderItem={data => (
            <Question
              index={data.index}
              handleAnswer={handleAnswer}
              data={data.item}
            />
          )}
          ref={flatListRef}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      )}
    </Wrapper>
  );
}

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 2rem;
`;
const Wrapper = styled.View`
  height: 100%;
`;
const QuestionWrapper = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  width: ${width};
`;
const Btn = styled.View`
  margin: 20;
  width: 40%;
`;
const Btn2 = styled.View`
  margin: 20;
  width: 80%;
`;

export default GameScreen;
