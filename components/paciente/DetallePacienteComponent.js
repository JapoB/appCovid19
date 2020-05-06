import React from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';


const PacientesComponent = (props) => {


    return (
      
      <Modal visible={props.visible} animationType='slide'>

      <View>  
      <Text>Detalles del paciente {props.paciente[0]} {props.paciente[1]}</Text>
      <Text>{props.paciente}</Text>
      <Button title="Cerrar" onPress={props.close.bind(this)}/>


      </View>
      </Modal>

    );

}   

export default PacientesComponent;