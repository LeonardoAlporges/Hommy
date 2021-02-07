/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

export const imagePickerOptions = {
  noData: true
};
export const FireBaseStorage = storage();

export const getFileLocalPath = response => {
  const { path, uri } = response;
  return Platform.OS === 'android' ? path : uri;
};

export const createStorageReferenceToFileRepublica = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(`/pictures/republicas/${fileName}`);
  //return FireBaseStorage.ref(`/imagem/${fileName}`).delete();
};

export const createStorageReferenceToFileRepublicaProduto = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(`/pictures/republicasProdutos/${fileName}`);
  //return FireBaseStorage.ref(`/imagem/${fileName}`).delete();
};
export const createStorageReferenceToFileRepublicaEvento = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(`/pictures/republicasEventos/${fileName}`);
  //return FireBaseStorage.ref(`/imagem/${fileName}`).delete();
};
export const createStorageReferenceToFileUser = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(`/pictures/user/${fileName}`);
  //return FireBaseStorage.ref(`/imagem/${fileName}`).delete();
};
export const createStorageReferenceToFileServico = response => {
  const { fileName } = response;
  return FireBaseStorage.ref(`/pictures/servicos/${fileName}`);
};

export const uploadFileToFireBaseRepublica = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFileRepublica(imagePickerResponse);
  return storageRef.putFile(fileSource);
};

export const uploadFileToFireBaseRepublicaEventos = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFileRepublicaEvento(imagePickerResponse);
  return storageRef.putFile(fileSource);
};
export const uploadFileToFireBaseRepublicaProduto = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFileRepublicaProduto(imagePickerResponse);
  return storageRef.putFile(fileSource);
};

export const uploadFileToFireBase = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFile(imagePickerResponse);
  return storageRef.putFile(fileSource);
};

export const uploadFileToFireBaseServico = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFileServico(imagePickerResponse);
  return storageRef.putFile(fileSource);
};

export const uploadFileToFireBaseUser = imagePickerResponse => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFileUser(imagePickerResponse);
  return storageRef.putFile(fileSource);
};
export const uploadProgress = ratio => Math.round(ratio * 100);
