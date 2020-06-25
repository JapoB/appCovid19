import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import PacientesComponent from "../../app/components/paciente/PacientesComponent";

import PacienteScreen from "../screens/pacientes/PacienteScreen";
import DetallePacientesComponent from "../components/paciente/DetallePacienteComponent";
import AgregarPacienteComponent from "../components/paciente/AgregarPacienteComponent";

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const PacientesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="pacientes" component={PacienteScreen} options={{title: 'Pacientes'}}></Stack.Screen>
            <Stack.Screen name="detallesPaciente" component={DetallePacientesComponent} options={{title: 'Detalles Paciente'}}></Stack.Screen>
            <Stack.Screen name="cargarPaciente" component={AgregarPacienteComponent} options={{title: 'Agregar Paciente'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default PacientesStack;