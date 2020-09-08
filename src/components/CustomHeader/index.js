import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import style from './styles';

export const HeaderBack = props => {
  return (
    <View style={style.V_headerBack}>
      <TouchableOpacity
        style={style.Touch}
        onPress={async () => {
          props.onNavigation();
        }}
      >
        <Icon name="arrow-left" style={style.iconHeader} />
      </TouchableOpacity>
      <View style={style.V_Title}>
        <Text numberOfLines={1} style={style.txt_title}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBack;
