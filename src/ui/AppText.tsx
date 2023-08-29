import {typography, colors} from '../utils/theme';
import React from 'react';
import {TextStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'rn-css';

export interface TextProps extends Omit<TextStyle, 'flex'> {
  center?: boolean;
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontsWeight;
  color?: keyof typeof colors;
  opacity?: number;
  marginTop?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  children?: any;
  onPress?: () => void;
  style?: TextStyle;
  numberOfLines?: number;
}

const Text = styled.Text<TextProps>`
  color: ${({color}) => (color ? colors[color] : colors.black)};
  opacity: ${({opacity}) => opacity || 1};
  font-weight: ${({weight}) =>
    weight ? typography.fontsWeight[weight] : typography.fontsWeight.medium};
  font-size: ${({size}) =>
    size ? `${typography.fontSize[size]}px` : `${typography.fontSize.t16}px`};
  text-align: ${({center}) => (center ? 'center' : 'auto')};
  margin-left: ${({marginLeft}) => (marginLeft ? `${marginLeft}px` : '0px')};
  margin-right: ${({marginRight}) =>
    marginRight ? `${marginRight}px` : '0px'};
  margin-top: ${({marginTop}) => (marginTop ? `${marginTop}px` : '0px')};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? `${marginBottom}px` : '0px'};
`;

export const AppText = ({children, ...props}: TextProps) => {
  if (props.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Text {...props} allowFontScaling={false}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text {...props} allowFontScaling={false}>
      {children}
    </Text>
  );
};
