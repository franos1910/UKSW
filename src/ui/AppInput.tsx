import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {StyleProp} from 'react-native';
import {colors} from '../utils/theme';
import ErrorText from './ErrorText';

export interface AppInputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<TextInputProps>;
  error?: string;
}

function AppInput({label, style, error, ...rest}: AppInputProps) {
  return (
    <View>
      <TextInput
        style={[
          {
            borderRadius: 5,
            backgroundColor: colors.purple,
            height: 44,
            paddingHorizontal: 10,
            color: colors.black,
          },
          style,
        ]}
        {...rest}
      />
      {Boolean(error) && <ErrorText text={error} />}
    </View>
  );
}

export default AppInput;
