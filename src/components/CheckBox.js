import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const CheckBox = ({isChecked, onChange, label}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onChange(!isChecked);
        console.log('checxed', label);
      }}
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: isChecked ? '#FFC20E' : 'transparent',
          borderColor: isChecked ? '#FFC20E' : '#fff',
          borderWidth: 1,
          borderRadius: 6,
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isChecked ? (
          <Image source={require('../../assets/images/icons/checkbox.png')} />
        ) : null}
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
