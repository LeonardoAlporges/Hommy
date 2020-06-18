import React from 'react';
import { View, Modal } from 'react-native';
import { Spinner } from 'native-base';
import styles from './styles';

const Loading = () => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.ViewFundo}>
          <View style={styles.ViewModal}>
            <Spinner color="#142850" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loading;
