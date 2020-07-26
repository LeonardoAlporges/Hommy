import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import style from './styles';

export const Header = props => {
  return (
    <View style={style.V_header}>
      <TouchableOpacity
        style={{ marginLeft: '5%' }}
        onPress={() => {
          props.onNavigation();
        }}
      >
        <Icon name="ios-arrow-back" style={style.iconHeader} />
      </TouchableOpacity>
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
};

export const HeaderBack = props => {
  return (
    <View style={style.V_headerBack}>
      <TouchableOpacity
        style={style.Touch}
        onPress={async () => {
          props.onNavigation();
        }}
      >
        <Icon name="ios-arrow-back" style={style.iconHeader} />
      </TouchableOpacity>
      <View style={style.V_Title}>
        <Text numberOfLines={1} style={style.txt_title}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export const HeaderBackTrasp = props => {
  return (
    <View style={style.V_headerBackTranp}>
      <TouchableOpacity
        style={style.Touch}
        onPress={async () => {
          props.onNavigation();
        }}
      >
        <Icon name="ios-arrow-back" style={style.iconHeader} />
      </TouchableOpacity>
      <View style={style.V_Title}>
        <Text style={style.txt_title}>{props.title}</Text>
      </View>
    </View>
  );
};

export default HeaderBack;
