import React from 'react';
import { Modal } from 'react-native';
import { Spinner } from 'native-base';
import { ViewFundo, ViewModal } from './styles';

export default function Loading() {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <ViewFundo>
        <ViewModal>
          <Spinner color="#142850" />
        </ViewModal>
      </ViewFundo>
    </Modal>
  );
}
