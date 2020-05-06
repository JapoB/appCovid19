import React from "react";
import { StyleSheet, Text, View, Button, Modal,TextInput } from "react-native";
import TablaPacientesComponent from "./TablaPacientesComponent";

const CargarDatosComponent = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
          <Text style={styles.bold}>
          Cargar datos del paciente {props.paciente.nombre} {props.paciente.apellido}
        </Text>
        <View style={styles.inputContainer}>
        <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
         <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
         <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
         <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
         <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
         <TextInput  style={styles.input}
          placeholder="Course Goal"
        />
          </View>
      <Button title="Volver" onPress={props.close.bind(this)} />
    </Modal>
  );
};

const styles = StyleSheet.create({
    input: {
      width: "80%",
      borderColor: "black",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      
    },
    inputContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   
    },
    //Una view solo ocupa el tamaño que tienen sus elementos internos, como el div, por eso se le da width de 60%
    internalInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "60%",
    },
  
    button: {
      width: 70,
    },
  });
  

export default CargarDatosComponent;
