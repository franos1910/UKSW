import React from 'react';
import {
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {colors} from '../utils/theme';
import styled from 'rn-css';
import FlexBox from './FlexBox';

interface props {
  children: React.ReactNode;
  onClose?: () => void;
}

const AppModal = ({children, onClose}: props) => {
  return (
    <Modal transparent>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: colors.black + '90',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onClose}>
        <TouchableWithoutFeedback>
          <SafeAreaView
            style={{
              paddingHorizontal: 10,
              width: '95%',
              borderRadius: 15,
              backgroundColor: colors.white,
            }}>
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
              <FlexBox style={{flex: 1}}>{children}</FlexBox>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;
