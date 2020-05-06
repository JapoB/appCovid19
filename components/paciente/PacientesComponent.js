import React from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import TablaPacientesComponent from './TablaPacientesComponent'


const PacientesComponent = (props) => {

  


    return (
      
      <Modal visible={props.visible} animationType='slide'>
          
         <TablaPacientesComponent/>

         <Button title="Menu Principal" onPress={props.close.bind(this)}/> 
      </Modal>



    );

}   

export default PacientesComponent;