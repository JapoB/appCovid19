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
import { QueryInicial } from "./baseDatos/Querys";
import * as SQLite from 'expo-sqlite';

//Llama a la bd y crea las tablas
if(db ==null ){
var db = QueryInicial();
}

/* const db = SQLite.openDatabase("db.db");
 
  


db.transaction((tx) =>{
  console.log("Dropeo la tabla Paciente")
  tx.executeSql('DROP TABLE Paciente',[],(txt,results)=>
  console.log("Dropeo exitoso"))
}) */
/* 
db.transaction((tx ) => {
  console.log("creo trabla de paciente")
  tx.executeSql('CREATE TABLE Paciente(dni INTEGER PRIMARY KEY, nombre VARCHAR(20),apellido VARCHAR(20), genero varchar(20))',[],(tx,results)=>{
  console.log("Creacion de tabla exitosa")
  console.log(results)})
});
 

db.transaction((tx ) => {
  console.log("inserto en tabla paciente")
  tx.executeSql('INSERT INTO Paciente (dni, nombre,apellido,genero) VALUES (1,"Juan","Perez","M")',[],(tx,results)=>{
  console.log("insersion exitosa")
  console.log(results)})

});

db.transaction((tx) => {
  console.log("busco tabla")
  tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
      console.log("Query completed");

    
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        console.log(`dni : ${row.dni}`);
      }
    });
}); */

 


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs  = createMaterialTopTabNavigator();
console.log(db)

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
      <PacientesComponent navigation={navigation} db ={db}/>
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
