import React from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import TablaPacientesComponent from './TablaPacientesComponent'
import { SelectPacientes } from "../../baseDatos/QuerysComunes";


const PacientesComponent = (props) => {

    return (
      
     <View>  
         <TablaPacientesComponent db={props.db}/>
          <Button title="Menu Principal" onPress={() =>props.navigation.navigate('Home')}/> 
     </View>



    );


    
}   

export default PacientesComponent;