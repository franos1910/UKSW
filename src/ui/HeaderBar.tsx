import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import styled from 'rn-css';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppText} from './AppText';
import {useNavigation} from '@react-navigation/native';
import {shadow} from '../utils/theme';

const HeaderBar = ({text}: {text: string}) => {
  const navigation = useNavigation();
  return (
    <Wrapper style={shadow.shadow1}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
      <AppText size="t20">{text}</AppText>
      <View></View>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin: 15px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

export default HeaderBar;
