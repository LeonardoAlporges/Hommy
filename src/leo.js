import React, { Component } from 'react';
import createRoutes from '../src/Routes';
import { useSelector } from 'react-redux';

export default function Rotas() {
  const signed = useSelector(state => state.auth.logado);
  console.tron.log('signed', signed);
  const Routes = createRoutes(signed);
  return <Routes />;
}
