import React, { Component } from 'react';
import createRoutes from '../src/Routes';
import { useSelector } from 'react-redux';

export default function Rotas() {
  var signed = useSelector(state => state.auth.logado);
  // if (signed == undefined) {
  //   signed = false;
  //   console.log('Falso');
  // }
  console.log('signed', signed);
  const Routes = createRoutes(signed);
  return <Routes />;
}
