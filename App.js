import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";


/* Components */
import PacientesComponent from "./components/paciente/PacientesComponent";
import SignoVitalComponent from "./components/signoVital/SignoVitalComponent";
import AddSignoVitalComponent from "./components/signoVital/AddSignoVital"

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';
//import { openDatabase } from 'react-native-sqlite-storage';
import { QueryInicial } from "./baseDatos/Querys";
import * as SQLite from 'expo-sqlite';
import SignoVital from "./components/signoVital/SignoVitalComponent";



//Llama a la bd y crea las tablas
var db = QueryInicial();


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> App Covid 19 </Text>

      <View style={{ marginTop: 10 }}>

        <Button title="Ver pacientes" onPress={() => navigation.navigate('Pacientes')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Ver Signos Vitales" onPress={() => navigation.navigate('SignoVital')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Cargar Signos Vitales" onPress={() => navigation.navigate('AddSignoVital')} />
      </View>


    </View>
  );
}

function PacientesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PacientesComponent navigation={navigation} db={db} />
    </View>
  );
}
function SignoVitalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SignoVitalComponent navigation={navigation} />
    </View>
  );
}
function AddSignoVitalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AddSignoVitalComponent navigation={navigation} db={db}/>
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
        <Drawer.Screen name="SignoVital" component={SignoVitalScreen} options={{ title: 'Signos Vitales' }} />
        <Drawer.Screen name="AddSignoVital" component={AddSignoVitalScreen} options={{ title: 'Cargar Signos Vitales' }} />

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
  boton: {
    marginTop: 15
  }
});
