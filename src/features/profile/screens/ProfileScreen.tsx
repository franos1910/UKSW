import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'rn-css';
import {useNavigation} from '@react-navigation/native';
import {AppText} from '../../../ui/AppText';
import {getString} from '../../../utils/locales/string';
import HeaderBar from '../../../ui/HeaderBar';
import {colors, shadow} from '../../../utils/theme';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <HeaderBar text={getString('profile', 'profile')} />
      <Wrapper contentContainerStyle={{padding: 15}}>
        <Item
          style={shadow.shadow1}
          onPress={() => {
            navigation.navigate('editProfile', {editMode: true});
          }}>
          <AppText>{getString('profile', 'editProfile')}</AppText>
        </Item>
        <Item
          style={shadow.shadow1}
          onPress={() => {
            navigation.navigate('KnownWords');
          }}>
          <AppText>{getString('profile', 'knownWords')}</AppText>
        </Item>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
const Item = styled.TouchableOpacity`
  background: white;
  border-radius: 15px;
  padding: 1rem;
  margin-top: 20px;
`;

export default ProfileScreen;
