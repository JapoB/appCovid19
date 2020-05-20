import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DetallePacienteComponent from "./DetallePacienteComponent";
import _ from 'lodash';
import { SelectPacientes } from "../../baseDatos/Querys";
import { QueryInicial, db } from "../../baseDatos/Querys";



const TablaPacientesComponent = (props) => {
 



const buscoPaciente = () =>{

console.log("busco pacientes")
if(props.db!=null){
props.db.transaction((tx) => {
  console.log("busco tabla en tabla pacientes")
  tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
      console.log("Query completed de tabla pacientes");
      var len = results.rows.length;
      var newData=[]
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
      //  console.log(`dni : ${row.dni}`);
      // console.log(`nombre : ${row.nombre}`);
     // console.log(`apellido : ${row.apellido}`);
        newData.push({nombre:row.nombre,apellido:row.apellido,dni:row.dni})
        setTableData(newData)
      
      }
    });
}); 
}
}



const updatePaciente = pacienteNuevo => {



  console.log("Update paciente " + pacienteNuevo.dni)


    var index = _.findIndex(tableData, {dni: pacienteNuevo.dni});
    tableData.splice(index, 1, pacienteNuevo);
    setTableData(tableData);
   

  } 
  const [tableData, setTableData] = useState ([]) 
  const tableHead = ["Nombre", "Apellido", "DNI"];

  const [visibleDetalle, setVisibleDetalle] = useState(false);

  const [tableDetalle, setTableDetalle] = useState([]);
  const [paciente, setPaciente] = useState(  { nombre: "Juan", apellido: "3", dni: "3", cama: "3", estado: "bien", edad:50, genero:'M',
  estadoClinico:{
      icc:'no',
      epoc:'no',
      diabetes:'no',
      frecuenciaRespiratoria:12,
      saturacionOxigeno: 92,
      saturacionOxigenoEpoc:85 ,
      oxigenoSuplementario: 'no',
      presionSistolitica:100,
      frecuenciaCardiaca:51,
      temperatura:36,
      dienea:'si',
      dimeroD:1100,
      linfopenia:1200,
      proteinaC:95,
      urgencia:'Sin riesgo',
      puntaje:10
  } });

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
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Seleccione Paciente</Text>
      </View>

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
         
         <TouchableOpacity onPress={() => openModal(itemData.item)}>
             {/*  <View style={getStylePuntaje(itemData.item.estadoClinico.urgencia)}></View> */}
              <View style={styles.item}>
                <Text>{itemData.item.nombre}</Text>

                <Text>{itemData.item.apellido}</Text>

                <Text>{itemData.item.dni}</Text>

          
              </View>
              
        
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <Button title="Recargar" onPress={buscoPaciente}/> 

      <DetallePacienteComponent
        visible={visibleDetalle}
        paciente={paciente}
        close={closeModal}
        updatePaciente = {updatePaciente}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },

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
