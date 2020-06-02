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
import * as Font from 'expo-font'
import * as SQLite from 'expo-sqlite';
import  DetallePacientesComponent  from "./components/paciente/DetallePacienteComponent";
import  AgregarPacienteComponent from "./components/paciente/AgregarPacienteComponent";
import  TablaPacientesComponent from "./components/paciente/TablaPacientesComponent";
//Llama a la bd y crea las tablas
//if(db ==null )
  var db2 = QueryInicial();
//else 
  //var db2 = db;



const Drawer = createDrawerNavigator();

const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs  = createMaterialTopTabNavigator();


function HomeScreen({ navigation }) {
  return (
<View style={styles.container}>
      <Text> App Covid 19 </Text>
      <Button title="Ver pacientes" onPress={() => navigation.navigate('Pacientes')} />
      <Button title="Cargar Paciente" onPress={() => navigation.navigate('AgregarPaciente')} />

    </View>
  );

} 

function DetallePacienteScreen({ route, navigation }) {
  const { numeroHC } = route.params;
  const { idHospital } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <DetallePacientesComponent numeroHC={numeroHC} idHospital ={idHospital} db ={db2} navigation={navigation}/> 
   </View>
  );  
}

function TablaPacientesScreen({ navigation }) {
  return (
    <TablaPacientesComponent navigation={navigation} db ={db2}/>
  );
}

function PacientesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PacientesComponent navigation={navigation} db ={db2}/>
    </View>
  );
}


function AgregarPacienteScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <AgregarPacienteComponent navigation={navigation} db ={db2}/> 
    </View>
  );
}




export default function App() {
  console.disableYellowBox = true;
  Font.loadAsync({
    'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf')
  })



  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Pacientes" component={PacientesScreen} />
      <Drawer.Screen name="DetallePaciente" component={DetallePacienteScreen} />
      <Drawer.Screen name="AgregarPaciente" component={AgregarPacienteScreen} />
      <Drawer.Screen name="TablaPaciente" component={TablaPacientesScreen} />
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
