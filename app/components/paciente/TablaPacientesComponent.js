import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import _ from 'lodash';
import { Container, View, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../utils/baseDatos/Querys';

/**
 * Aca falta cambiar la navegabilidad hacia detalle paciente, no es mas un modal es una ventana nuev
 */

const TablaPacientesComponent = (props) => {
	const { setPacienteScreen } = props;
	const navigation = useNavigation();
	const [ tableData, setTableData ] = useState([]);
	const tableHead = [ 'Nombre', 'Apellido', 'DNI' ];

	const [ visibleDetalle, setVisibleDetalle ] = useState(false);
	const [ paciente, setPaciente ] = useState(null);

	const [ row, setRow ] = useState(null);

	useEffect(() => {
		selectPacientes();
	}, []);

	const selectPacientes = () => {
		if (db != null) {
			db.transaction((tx) => {
				tx.executeSql('SELECT * FROM Paciente', [], (tx, results) => {
					var len = results.rows.length;
					var newData = [];
					for (let i = 0; i < len; i++) {
						let rows = results.rows.item(i);
						newData.push(rows);
						setTableData(newData);
					}
				});
			});
		}
	};

	const joins = async (numHc, idHos) => {
		if (db != null) {
			setPaciente(null);
			await db.transaction(async (tx) => {
				console.log('JOINS 2 con ', numHc, idHos);
				await tx.executeSql(
					'SELECT * FROM Paciente JOIN SignosVitales ON Paciente.numeroHC = SignosVitales.numeroHC AND paciente.idHospital = SignosVitales.id_hospital' +
						' JOIN Laboratorio ON Paciente.numeroHC = Laboratorio.numeroHC AND Paciente.idHospital = Laboratorio.idHospital' +
						' JOIN Cama ON Paciente.numeroHC = Cama.numeroHC AND Paciente.idHospital = Cama.idHospital' +
						' JOIN Alerta ON Paciente.numeroHC = Alerta.numeroHC AND Paciente.idHospital = Alerta.idHospital' +
						' WHERE Paciente.numeroHC = ? AND Paciente.idHospital = ?',
					[ numHc, idHos ],
					(tx, results) => {
						var len = results.rows.length;
						console.log('Joins 4');
						if (len === 0) {
							setPaciente(null);
						}

						for (let i = 0; i < len; i++) {
							let rows = results.rows.item(i);
							setPaciente(rows);
							console.log(rows);
							//	setEdad(calcularEdad);
						}
					},
					(tx, err) => {
						console.log('ERROR ', err);
						setPaciente(null);
					}
				),
					() => {
						console.log('error'),
							() => {
								console.log('suc');
							};
					};
			});
			console.log('saliendo de joins');
		}
	};

	const getStylePuntaje = (urg) => {
		let retorno = styles.verde;
		if (urg == 'bajo') retorno = styles.amarillo;
		if (urg == 'moderado') retorno = styles.naranja;
		if (urg == 'alto') retorno = styles.rojo;

		return retorno;
	};

	//borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}

	const onPressHandler = async (item) => {
    await joins(item.numeroHC,item.idHospital);
      console.log(paciente);
		  navigation.navigate('detallesPaciente',{
      paciente: paciente
    })   
	};

	return (
		<Container style={styles.container}>
			{/*   <HeaderComponent title={'Seleccione Paciente'} navigation={props.navigation} ruta = {'Home'}></HeaderComponent>
 */}

			<View style={styles.headTable}>
				<Text style={styles.bold}>{tableHead[0]}</Text>
				<Text style={styles.bold}>{tableHead[1]}</Text>
				<Text style={styles.bold}>{tableHead[2]}</Text>
				<Text style={styles.bold}>{tableHead[3]}</Text>
			</View>

			<SafeAreaView style={styles.scroll}>
				<FlatList
					data={tableData}
					key={tableData.dni}
					keyExtractor={(item, index) => index.toString()}
					renderItem={(itemData) => (
						/*    <TouchableOpacity onPress={() => navigation.navigate('DetallePaciente',{
        numeroHC: itemData.item.numeroHC,
        idHospital: itemData.item.idHospital,
      })}>  esto es lo que habia antes...toca y navega a detalle con los datos. Voy a intentar*/
						/*   <TouchableOpacity onPress={() => setPacienteScreen(itemData.item)}>  Esto funciona pero el header pierde la flecha*/
						<TouchableOpacity onPress={() => onPressHandler(itemData.item)}>
							<View style={styles.item}>
								<Text>{itemData.item.nombre}</Text>
								<Text>{itemData.item.apellido}</Text>
								<Text>{itemData.item.dni}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			</SafeAreaView>

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
		width: '95%',
		backgroundColor: '#f4f4f4',
		alignContent: 'center',
		marginLeft: 10
	},

	head: {
		height: 40,
		backgroundColor: '#f1f8ff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#c8e1ff'
	},

	item: {
		padding: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		height: 40,
		borderWidth: 2,
		borderColor: '#c8e1ff',
		marginTop: 10
	},
	verde: {
		backgroundColor: '#32CD32',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		height: 40,
		borderWidth: 2,
		borderColor: '#c8e1ff',
		marginTop: 10
	},
	rojo: {
		backgroundColor: '#FF0000',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		height: 40,
		borderWidth: 2,
		borderColor: '#c8e1ff',
		marginTop: 10
	},
	amarillo: {
		backgroundColor: '#FFFF00',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		height: 40,
		borderWidth: 2,
		borderColor: '#c8e1ff',
		marginTop: 10
	},
	naranja: {
		backgroundColor: '#FF8C00',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		width: '100%',
		height: 40,
		borderWidth: 2,
		borderColor: '#c8e1ff',
		marginTop: 10
	},
	headTable: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 20,
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	bold: { fontWeight: 'bold', textAlign: 'center', fontSize: 20 },

	scroll: {
		maxHeight: '70%'
	}
});

export default TablaPacientesComponent;
