import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DetallePacienteComponent from "./DetallePacienteComponent";
import _ from 'lodash';
import { Container, View, Text } from 'native-base';
import  HeaderComponent  from "./vistas/HeaderComponent";



import { QueryInicial, db } from "../../baseDatos/Querys";


/**
 * 
 * Aca falta cambiar la navegabilidad hacia detalle paciente, no es mas un modal es una ventana nuev
 */



const TablaPacientesComponent = (props) => {


  useEffect(() => {
    selectPacientes();
   
  }, []);

const selectPacientes = () =>{
  if(props.db!=null){
    props.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
          var len = results.rows.length;
        
          var newData=[]
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
          newData.push(row)
          setTableData(newData)
          }
        });
    }); 
    }
  }


  const [tableData, setTableData] = useState([]); 
  const tableHead = ["Nombre", "Apellido", "DNI"];

  const [visibleDetalle, setVisibleDetalle] = useState(false);

  const [tableDetalle, setTableDetalle] = useState(selectPacientes);
  const [paciente, setPaciente] = useState(null);

  const openModal = (item) => {
   setPaciente(item);
  setVisibleDetalle(true);
  };

  const closeModal = () => {
    setVisibleDetalle(false);
  };

  const getStylePuntaje = (urg) => {
    let retorno = styles.verde
    if(urg=='bajo')
      retorno = styles.amarillo
      if(urg=='moderado')
      retorno = styles.naranja
      if(urg=='alto')
      retorno = styles.rojo
    
    return retorno;
  }

  //borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}



 


  return (
    <Container style={styles.container}> 
  
  <HeaderComponent title={'Seleccione Paciente'} navigation={props.navigation} ruta = {'Home'}></HeaderComponent>


    <View style={styles.headTable}>
      <Text style={styles.bold}>{tableHead[0]}</Text>
      <Text style={styles.bold}>{tableHead[1]}</Text>
      <Text style={styles.bold}>{tableHead[2]}</Text>
      <Text style={styles.bold}>{tableHead[3]}</Text>
    </View>

    <ScrollView style={styles.scroll}>
      <FlatList       
        data={tableData}
        key = {tableData.dni}
        renderItem={(itemData) => (         
       <TouchableOpacity onPress={() => props.navigation.navigate('DetallePaciente',{
        numeroHC: itemData.item.numeroHC,
        idHospital: itemData.item.idHospital,
      })}>
            <View style={styles.item}>
              <Text>{itemData.item.nombre}</Text>
              <Text>{itemData.item.apellido}</Text>
              <Text>{itemData.item.dni}</Text>         
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>


    {/* <DetallePacienteComponent
      visible={visibleDetalle}
      paciente={paciente}
      close={closeModal}
      updatePaciente = {updatePaciente}
    /> */}
</Container>
  );
};



const styles = StyleSheet.create({
  /* container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" }, */
  container: {
    width: '100%'
  },

  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#c8e1ff",
  },

  item: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#c8e1ff",
    marginTop: 10,
  },
  verde:{
    backgroundColor:'#32CD32',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#c8e1ff",
    marginTop: 10,
  },
  rojo:{
    backgroundColor:'#FF0000',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#c8e1ff",
    marginTop: 10,
  },
  amarillo:{
    backgroundColor:'#FFFF00',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#c8e1ff",
    marginTop: 10,
  },
  naranja:{
    backgroundColor:'#FF8C00',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "#c8e1ff",
    marginTop: 10,
  },
  headTable: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "bold", textAlign: "center", fontSize: 20 },

  scroll: {
    maxHeight: "70%",
  },
});

export default TablaPacientesComponent;
