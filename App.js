import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PacientesComponent from "./components/paciente/PacientesComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs  = createMaterialTopTabNavigator();


function HomeScreen({ navigation }) {
  return (
<View style={styles.container}>
      <Text> App Covid 19 </Text>
      <Button title="Ver pacientes" onPress={() => navigation.navigate('PacientesScreen')} />
    </View>
  );
}

function PacientesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PacientesComponent navigation={navigation}/>
    </View>
  );
}


export default function App() {
  console.disableYellowBox = true;
 


  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="PacientesScreen" component={PacientesScreen} />
    </Drawer.Navigator>

    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
