import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PacientesComponent from "./components/paciente/PacientesComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';
//import { openDatabase } from 'react-native-sqlite-storage';
import { QueryInicial, db } from "./baseDatos/Querys";
import * as SQLite from 'expo-sqlite';

//Llama a la bd y crea las tablas
if(db ==null )
  var db2 = QueryInicial();
else 
  var db2 = db;



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs  = createMaterialTopTabNavigator();


function HomeScreen({ navigation }) {
  return (
<View style={styles.container}>
      <Text> App Covid 19 </Text>
      <Button title="Ver pacientes" onPress={() => navigation.navigate('Pacientes')} />
    </View>
  );  
}

function PacientesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PacientesComponent navigation={navigation} db ={db2}/>
    </View>
  );
}


export default function App() {
  console.disableYellowBox = true;
 


  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Pacientes" component={PacientesScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0255",
    alignItems: "center",
    justifyContent: "center",
  },
});
