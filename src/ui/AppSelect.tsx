import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import styled from 'rn-css';
import {AppText} from './AppText';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/theme';
import ErrorText from './ErrorText';

interface SelectProps {
  data: {value: string; label: string}[];
  onSelect: () => void;
  error?: string;
  selectedValue: string;
}

function AppSelect({data, onSelect, selectedValue, error}: SelectProps) {
  const label = selectedValue
    ? data.find(item => item.value === selectedValue).label
    : '';
  return (
    <View>
      <SelectDropdown
        data={data}
        defaultValueByIndex={data.findIndex(
          item => item.value === selectedValue,
        )}
        onSelect={onSelect}
        defaultValue={selectedValue}
        renderDropdownIcon={() => {
          return (
            <Box>
              <AppText>{label}</AppText>
              <Icon name="arrow-down" size={16} />
            </Box>
          );
        }}
        rowTextForSelection={item => {
          return item.label;
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem.label;
        }}
        buttonStyle={{
          borderRadius: 5,
          backgroundColor: colors.purple,
          width: '100%',
        }}
        rowStyle={{
          backgroundColor: colors.purple,
          borderBottomWidth: 0,
        }}
        buttonTextStyle={{
          fontSize: 14,
          color: colors.black,
        }}
        dropdownOverlayColor="transparent"
        defaultButtonText=""
        dropdownStyle={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          marginTop: -5,
        }}
        renderCustomizedRowChild={(item, index, isSelected) => (
          <Box>
            <AppText>{item.label}</AppText>
          </Box>
        )}
      />
      {Boolean(error) && <ErrorText text={error} />}
    </View>
  );
}

const Box = styled.View`
  width: 100%;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AppSelect;
