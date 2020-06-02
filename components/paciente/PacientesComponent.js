import React from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import TablaPacientesComponent from './TablaPacientesComponent'


const PacientesComponent = (props) => {

    return (
      
     <View>  
         <TablaPacientesComponent db={props.db} navigation={props.navigation}/>
          <Button title="Menu Principal" onPress={() =>props.navigation.navigate('Home')}/> 
          
     </View>



    );


    
}   

export default PacientesComponent;