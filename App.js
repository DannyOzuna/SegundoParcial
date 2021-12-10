import { StatusBar } from 'expo-status-bar';
import React, { useState, createContext, useEffect } from 'react';
import { Text } from 'react-native';
import { NativeRouter, Route, Link, Routes } from 'react-router-native';

import Form from './components/Form/Form';
import f, { initializeApp } from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './components/List';
import Map from './components/Map/Map';
import 'firebase/storage';

export const firebaseLifeCycle = initializeApp({
  apiKey: 'AIzaSyD5wT8EtEb57m4lJXZVC6CHk25KOB7jgRw',
  authDomain: 'negocio-ccee0.firebaseapp.com',
  projectId: 'negocio-ccee0',
  storageBucket: 'negocio-ccee0.appspot.com',
  messagingSenderId: '507583622967',
  appId: '1:507583622967:web:85b0b4b6aa61fd642cf4b2',
});

export const FirebaseContext = createContext(firebaseLifeCycle);
export const PlaceContext = createContext({
  coords: { lat: 18.90919, log: 70.74499 },
  setCoordinaste: () => null,
});
export default function App() {
  const [coordinates, setCoordinaste] = useState({
    coords: {
      lat: 18.90919,
      log: -70.74499,
    },
  });

  return (
    <>
      <StatusBar hidden />
      <PlaceContext.Provider value={(coordinates, setCoordinaste)}>
        <FirebaseContext.Provider value={firebaseLifeCycle}>
          <NativeRouter initialIndex={0} basename="/">
            <Routes>
              <Route path="/" element={<Form />} />\
              <Route path="/list" element={<List />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </NativeRouter>
        </FirebaseContext.Provider>
      </PlaceContext.Provider>
    </>
  );
}
