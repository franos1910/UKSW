import {AppText} from '../ui/AppText';
import React from 'react';
import styled from 'rn-css';
import {View} from 'react-native';

function SplashScreen() {
  return (
    <Wrapper>
      <AppText>LearnApp</AppText>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default SplashScreen;
