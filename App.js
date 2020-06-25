import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';
import * as Font from 'expo-font';
import Navigation from './app/navigations/Navigation';
import { QueryInicial } from "./app/utils/baseDatos/Querys";

//Llama a la bd y crea las tablas

//QueryInicial();

export default function App() {
	console.disableYellowBox = true;
	Font.loadAsync({
		Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf')
	});

	return <Navigation />;
}
const styles = StyleSheet.create({});
