import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PacientesComponent from './components/paciente/PacientesComponent' 

export default function App() {

const [modalPaciente, setModalPaciente] = useState(false);

const openPacientes = () => {
    setModalPaciente(true);
}

const closePacientes = () => {
    setModalPaciente(false);
}


    return (


        <View style = { styles.container } >

        <Text > App Covid 19 </Text>  
        <Button title = "Ver pacientes" onPress={openPacientes}/>
        <PacientesComponent visible={modalPaciente} close={closePacientes}/>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});