import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Modal, FlatList, TouchableOpacity } from 'react-native';
import DetallePacienteComponent from './DetallePacienteComponent'

const TablaPacientesComponent = (props) => {

const [tableData, setTableData] = useState([
    ['Juan', '1', '1', 'cama 1'],
    ['Juan', '2', '2', 'cama 2'],
    ['Juan', '3', '3', 'cama 3'],
    ['Juan', '4', '4', 'cama 4']
]);

const tableHead = ['Nombre','Apellido','DNI','CAMA'];

const [visibleDetalle, setVisibleDetalle] = useState(false);

const [tableDetalle, setTableDetalle] = useState([]);
let paciente = [0,0,0,0];

const openModal = (item) => {
    console.log("Open modal detalle");
    paciente = item;
    //setVisibleDetalle(true);
}

const closeModal = () => {
    setVisibleDetalle(false);
}

//borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}

    return (
      
      
        <View style={styles.container}>
            <View style={styles.head}>
             <Text>Seleccione Paciente</Text>
             </View>


          

         <View style={styles.headTable}>
            <Text style={styles.bold}>
                {tableHead[0]}  
            </Text>
            <Text style={styles.bold}>
                {tableHead[1]}  
            </Text>
            <Text style={styles.bold}>
                {tableHead[2]}  
            </Text>
            <Text style={styles.bold}>
               {tableHead[3]}  
            </Text>
       
        </View>
    

        <FlatList
        data={tableData}
        renderItem={(itemData) => (
        <TouchableOpacity onPress={openModal(itemData.item)}>
            <View style={styles.item}> 
          
        
            <Text>
                {itemData.item[0]}
            </Text>
        

            <Text>
             {itemData.item[1]} 
            </Text>

            <Text>
                {itemData.item[2]}
            </Text>

            <Text>
                {itemData.item[3]} 
            </Text>

            </View> 

            </TouchableOpacity>
        )}
      />

    <DetallePacienteComponent visible={visibleDetalle} paciente={paciente} close={closeModal}/>

        </View>



    );

}   

const styles = StyleSheet.create({
    container: { flex: 1, 
        padding: 16,
        paddingTop: 30, 
        backgroundColor: '#fff' },
  
    head: { height: 40, 
        backgroundColor: '#f1f8ff' ,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:2,
        borderColor:'#c8e1ff'},

    item:{
       
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width:"100%",
        height:40,
        borderWidth:2,
        borderColor:'#c8e1ff',
        marginTop:10
    },

    headTable:{
        flexDirection:"row",
        marginTop:20,
        marginBottom:20,
        alignItems: "flex-start",
        justifyContent: "space-between",

    },
    bold: {fontWeight: 'bold',
           textAlign: 'center',
           fontSize: 20,},

  });

export default TablaPacientesComponent;