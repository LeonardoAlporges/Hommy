import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Cabeca from '../../components/Cabeca';
import DetalhesAnuncio from '../../components/DetalhesAnuncio';

export default class PageAnuncio extends Component {
        render(){
            return (
                <View>
                    <Cabeca />
                    <DetalhesAnuncio />
                </View>
            );
        }
}


