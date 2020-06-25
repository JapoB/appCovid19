import React from 'react'
import {View, Text} from 'react-native'
import DetallePacientesComponent from '../../components/paciente/DetallePacienteComponent';


const DetallePacienteScreen = (props) => {
    const {numeroHC, idHospital} = props;

    return (
       
            <DetallePacientesComponent numeroHC={numeroHC} idHospital={idHospital} />
    )
}


export default PacienteScreen