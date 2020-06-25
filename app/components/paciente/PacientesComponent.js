import React from 'react'
import { StyleSheet,View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import TablaPacientesComponent from './TablaPacientesComponent'


const PacientesComponent = (props) => {

	const {setPaciente} = props;
    const navigation = useNavigation();

    return (
      
     <ScrollView  centerContent={true} style={styles.viewBody}>  
         <TablaPacientesComponent setPacienteScreen = {setPaciente} />
         <View style={styles.viewBtn}>
				<Button
					buttonStyle={styles.btnStyle}
					containerStyle={styles.btnContainer}
					title="Agregar nuevo paciente"
					onPress={() => navigation.navigate('cargarPaciente')}
				/>
			</View>
     </ScrollView>



    );


    
}   

const styles = StyleSheet.create({
    viewBody: {
        marginBottom:10
    },
    btnStyle: {
		marginTop: 20,
		backgroundColor: '#00a680'
	},
	btnContainer: {
		width: '70%'
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	}
})

export default PacientesComponent;