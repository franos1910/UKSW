//@ts-nocheck
import store, {useAppSelector} from '../../../redux/store';
import {data as home_data} from '../../../assets/json/home.json';
import {data as sport_data} from '../../../assets/json/sport.json';
import {getString} from '../../../utils/locales/string';

function shuffleArray(array) {
  var shuffledArray = array.slice();

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
  console.log('ss', shuffledArray);
  return shuffledArray;
}

export namespace GameLogic {
  const getCurrentCategoryName = (name: string) => {
    if (name === 'sport') {
      return sport_data;
    }
    if (name === 'home') {
      return home_data;
    }
  };
  export const getQuestions = () => {
    const currentLearningLanguage =
      store.getState().user.currentLearningLanguage;
    const appLanguage = store.getState().user.userLanguage;
    const currentCategory = store.getState().game.currentCategory;
    const currentCategorySize = getCurrentCategoryName(currentCategory)?.length;
    const userPoints = store
      .getState()
      .user.progress[currentLearningLanguage].find(
        x => x.categoryName === currentCategory,
      ).userPoints
      ? store
          .getState()
          .user.progress[currentLearningLanguage].find(
            x => x.categoryName === currentCategory,
          ).userPoints
      : 0;
    const categoryName = getCurrentCategoryName(currentCategory);

    let questions = [];

    for (let i = Number(userPoints); i < Number(userPoints) + 5; i++) {
      if (i === currentCategorySize) {
        return;
      }
      console.log(i);
      questions.push({
        type: 'WORD',
        question: getString('game', 'newWord'),
        newWord: categoryName[i][currentLearningLanguage],
        id: Math.random * 1000,
      });
    }

    for (let j = 0; j < 1; j++) {
      for (let i = Number(userPoints); i < Number(userPoints) + 5; i++) {
        if (i === currentCategorySize) {
          return;
        }
        questions.push({
          type: 'QUESTION',
          question: categoryName[i][appLanguage],
          correctAnswer: categoryName[i][currentLearningLanguage],
          answers: shuffleArray([
            categoryName[i][currentLearningLanguage],
            categoryName[Math.floor(Math.random() * currentCategorySize)][
              currentLearningLanguage
            ],
            categoryName[Math.floor(Math.random() * currentCategorySize)][
              currentLearningLanguage
            ],
            categoryName[Math.floor(Math.random() * currentCategorySize)][
              currentLearningLanguage
            ],
          ]),
          id: Math.random * 1000,
        });
      }
    }
    console.log('q', questions);
    return questions;
  };
}
