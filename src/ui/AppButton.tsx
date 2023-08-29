import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'rn-css';
import {AppText} from './AppText';
import {colors} from '../utils/theme';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

function AppButton({text, onPress}: ButtonProps) {
  return (
    <Button onPress={onPress}>
      <AppText center size="t18">
        {text}
      </AppText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 15px;
  background: ${colors.green};
`;

export default AppButton;
