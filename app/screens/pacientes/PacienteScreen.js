import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import PacientesComponent from '../../components/paciente/PacientesComponent';
import DetallePacientesComponent from '../../components/paciente/DetallePacienteComponent';

const PacienteScreen = () => {
	//Aca deberia tener un estado que se lo pasa al paciente component
	//Ese esatdo tiene guardado el paciente que se cliquea
	//Si es nulo muestro el pacientes component, si no es nulo muestro los detalles de ese paciente
	const navigation = useNavigation();
	const [ paciente, setPaciente ] = useState(null);

	return !paciente ? (
		<PacientesComponent setPaciente={setPaciente} />
	) : (
		<DetallePacientesComponent numeroHC={paciente.numeroHC} idHospital={paciente.idHospital} />
	);
};

export default PacienteScreen;
