import React from 'react';
import {AppText} from './AppText';
import styled from 'rn-css';
import {View} from 'react-native';

function ErrorText({text}: {text: string}) {
  return (
    <Box>
      <AppText color="red">{text}</AppText>
    </Box>
  );
}

const Box = styled.View``;

export default ErrorText;
