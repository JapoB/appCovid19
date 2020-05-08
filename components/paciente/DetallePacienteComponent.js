import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  ScrollView,
  TextInput
} from "react-native";

const DetallePacientesComponent = (props) => {


  const [visibleCargar, setVisibleCargar] = useState(false);
  const [paciente, setPaciente] = useState(props.paciente)
  const [lecturaFrecuenciaRespiratoria, setLecturaFrecuenciaRespiratoria] = useState(paciente.estadoClinico.frecuenciaRespiratoria)
  const [lecturaSaturacionOxigeno, setLecturaSaturacionOxigeno] = useState(paciente.estadoClinico.saturacionOxigeno)
  const [lecturaSaturacionOxigenoEpoc, setLecturaSaturacionOxigenoEpoc] = useState(paciente.estadoClinico.saturacionOxigenoEpoc)
  const [lecturaOxigenoSuplementario, setLecturaOxigenoSuplementario] = useState(paciente.estadoClinico.oxigenoSuplementario)
  const [lecturaPresionSistolitica, setLecturaPresionSistolitica] = useState(paciente.estadoClinico.presionSistolitica)
  const [lecturaFrecuenciaCardiaca, setLecturaFrecuenciaCardiaca] = useState(paciente.estadoClinico.frecuenciaCardiaca)
  const [lecturaLinfopenia, setLecturaLinfopenia] = useState(paciente.estadoClinico.linfopenia)
  const [lecturaDimero, setLecturaDimero] = useState(paciente.estadoClinico.dimeroD)
  const [lecturaDisnea, setLecturaDisnea] = useState(paciente.estadoClinico.disnea)
  const [lecturaProteinaC, setLecturaProteinaC] = useState(paciente.estadoClinico.proteniaC)
  const [lecturaTemperatura, setLecturaTemperatura] = useState(paciente.estadoClinico.temperatura)

  



  const openCargarDatos = () => {
 
    setVisibleCargar(true);
   
  };
  const closeCargarDatos = () => {
    setVisibleCargar(false);
  };

  const TextInputHandler = () =>{
/** Aca deberia armar un objeto de nuevo estado para mandarlo a la bd
 * y actualizar el paciente
console.log(lecturaFrecuenciaRespiratoria)
console.log(lecturaSaturacionOxigeno)
console.log(lecturaSaturacionOxigenoEpoc)
console.log(lecturaOxigenoSuplementario)
console.log(lecturaPresionSistolitica)
console.log(lecturaFrecuenciaCardiaca)
console.log(lecturaTemperatura)

*/
console.log("Paciente antes de updetear ");
console.log(paciente);

console.log("Paciente props");
console.log(props.paciente)

setPaciente({...paciente,
  dni: props.paciente.dni,
  estadoClinico: {
    icc:'no',
    epoc:'no',
    diabetes:'no',
    frecuenciaRespiratoria:lecturaFrecuenciaRespiratoria,
    saturacionOxigeno: lecturaSaturacionOxigeno,
    saturacionOxigenoEpoc:lecturaSaturacionOxigenoEpoc ,
    oxigenoSuplementario: lecturaOxigenoSuplementario,
    presionSistolitica: lecturaPresionSistolitica,
    frecuenciaCardiaca: lecturaFrecuenciaCardiaca,
    temperatura: lecturaTemperatura,
    dienea: lecturaDisnea,
    dimeroD: lecturaDimero,
    linfopenia: lecturaLinfopenia,
    proteinaC: lecturaProteinaC,
}
})

console.log("Paciente antes de calcular valor ");
console.log(paciente);


calcularValor();
//console.log("Paciente despues de updetear ");
//console.log(paciente);
  }

  const calcularValor = () =>{
    
    

    let llega3 = false;
    let valor = 0;

    if(paciente.edad>=60 && paciente.edad <=64)
        valor++;
    if(paciente.edad>65)    
        valor+=2;
    if(paciente.genero=='M')
        valor++;
    if(paciente.estadoClinico.icc=='si')
        valor++;
    if(paciente.estadoClinico.epoc=='si')
        valor++;
    if(paciente.estadoClinico.diabetes=='si')
        valor++;
    if(paciente.estadoClinico.oxigenoSuplementario=='si') 
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.disnea == 'si')
        valor+=2;
    if(paciente.estadoClinico.frecuenciaRespiratoria <=8 )
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.frecuenciaRespiratoria <=11 && paciente.estadoClinico.frecuenciaRespiratoria >8 )
        valor+=1 
    if(paciente.estadoClinico.frecuenciaRespiratoria <=24 && paciente.estadoClinico.frecuenciaRespiratoria >20 )
        valor+=2 
    if(paciente.estadoClinico.frecuenciaRespiratoria >24 )
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.saturacionOxigeno <=91)
        valor+=3;
        llega3 = true
    if(paciente.estadoClinico.saturacionOxigeno >=92 && paciente.estadoClinico.saturacionOxigeno <=93)
        valor+=2
    if(paciente.estadoClinico.saturacionOxigeno >=94 && paciente.estadoClinico.saturacionOxigeno <=95)
        valor+=1  
//oxigeno Epoc
    if(paciente.estadoClinico.saturacionOxigenoEpoc <=83)
        valor+=3;
        llega3 = true
    if(paciente.estadoClinico.saturacionOxigeno >=84 && paciente.estadoClinico.saturacionOxigeno <=86)
        valor+=2
    if(paciente.estadoClinico.saturacionOxigeno >=87 && paciente.estadoClinico.saturacionOxigeno <=88)
        valor+=1  
    if(paciente.estadoClinico.presionSistolitica <= 90)
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.presionSistolitica >= 220)
        valor+=3
        llega3 = true;
    if(paciente.estadoClinico.frecuenciaCardiaca <= 40)
        valor+=3
        llega3 = true;
    if(paciente.estadoClinico.frecuenciaCardiaca >= 41 &&  paciente.estadoClinico.frecuenciaCardiaca <=50)
        valor+=1
    if(paciente.estadoClinico.frecuenciaCardiaca >= 91 &&  paciente.estadoClinico.frecuenciaCardiaca <=110)
        valor+=1
    if(paciente.estadoClinico.frecuenciaCardiaca >= 111 &&  paciente.estadoClinico.frecuenciaCardiaca <=130)
        valor+=2
    if(paciente.estadoClinico.frecuenciaCardiaca > 131)
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.temperatura <= 35)
        valor+=3;
        llega3 = true;
    if(paciente.estadoClinico.temperatura >= 35 && paciente.estadoClinico.temperatura <= 35.5)
        valor+=1
    if(paciente.estadoClinico.temperatura >= 38 && paciente.estadoClinico.temperatura <= 39)
        valor+=1
    if(paciente.estadoClinico.temperatura > 39)
        valor+=2
    if(paciente.estadoClinico.dimeroD >1000)
        valor+=1
    if(paciente.estadoClinico.linfopenia <1000 && paciente.estadoClinico.linfopenia >=500 )
        valor+=1

    if(paciente.estadoClinico.linfopenia <500)
        valor+=2
      
    if(paciente.estadoClinico.proteniaC > 100)
        valor+=1

   console.log(valor);
   let urgencia = 'Sin riesgo' 
   if(valor>=3 && valor <=4){
    urgencia = 'Bajo'
   }
   if((valor>=5 && valor <=7 ) || llega3){
    urgencia = 'Moderado'
   }
   if(valor>=8 ){
    urgencia = 'Alto'
   }

   /** 
   setPaciente(
    {...paciente,
     estadoClinico:{...estadoClinico,
       puntaje:valor,
       urgencia:urgencia
     }
     })
    */

   setPaciente({...paciente,
    estadoClinico: {
    icc:'no',
    epoc:'no',
    diabetes:'no',
    frecuenciaRespiratoria:lecturaFrecuenciaRespiratoria,
    saturacionOxigeno: lecturaSaturacionOxigeno,
    saturacionOxigenoEpoc:lecturaSaturacionOxigenoEpoc ,
    oxigenoSuplementario: lecturaOxigenoSuplementario,
    presionSistolitica: lecturaPresionSistolitica,
    frecuenciaCardiaca: lecturaFrecuenciaCardiaca,
    temperatura: lecturaTemperatura,
    dienea: lecturaDisnea,
    dimeroD: lecturaDimero,
    linfopenia: lecturaLinfopenia,
    proteinaC: lecturaProteinaC,
      puntaje:valor,
      urgencia:urgencia
  }
  })

  
   console.log(urgencia);
  // console.log(paciente);

  console.log("llamo a update desde detalle con dni "+paciente.dni);
   props.updatePaciente(paciente);

   setVisibleCargar(false);
  
  }


  if(!visibleCargar){
  return (
    <Modal visible={props.visible} animationType="slide">
      <ScrollView style={styles.container}>
        <Text style={styles.bold}>
          Detalles del paciente {props.paciente.nombre} {props.paciente.apellido}
        </Text>

        <View style={styles.item}>
          <Text style={styles.boldi}>Datos Personales</Text>
          <Text>Nombre: {props.paciente.nombre}</Text>
          <Text>Apellido: {props.paciente.apellido}</Text>
          <Text>Dni: {props.paciente.dni}</Text>
          <Text>Cama: {props.paciente.cama}</Text>
          <Text>Estado: {props.paciente.estado}</Text>
          <Text>Edad: {props.paciente.edad}</Text>
          <Text>Genero: {props.paciente.genero}</Text>
          <Text>Icc Grado 2: {props.paciente.estadoClinico.icc}</Text>
          <Text>Epoc: {props.paciente.estadoClinico.epoc}</Text>
          <Text>
            Diabetes con dano en organo blanco: {props.paciente.estadoClinico.diabetes}
          </Text>

          <Text style={styles.boldi}>Ultimos datos clinicos</Text>
          <Text>Ugencia: {props.paciente.estadoClinico.urgencia} ({props.paciente.estadoClinico.puntaje})</Text>
          <Text>Frecuencia respiratoria: {props.paciente.estadoClinico.frecuenciaRespiratoria}</Text>
          <Text>Saturación de oxígeno: {props.paciente.estadoClinico.saturacionOxigeno}</Text>
          <Text>Saturación de oxígeno EPOC: {props.paciente.estadoClinico.saturacionOxigenoEpoc}</Text>
          <Text>Oxígeno suplementario: {props.paciente.estadoClinico.oxigenoSuplementario}</Text>
          <Text>Presión sistólica: {props.paciente.estadoClinico.presionSistolitica}</Text>
          <Text>Frecuencia cardiaca: {props.paciente.estadoClinico.frecuenciaCardiaca}</Text>
          <Text>Temperatura °C: {props.paciente.estadoClinico.temperatura}</Text>
          <Text>Refiere Disnea: {props.paciente.estadoClinico.disnea}</Text>
          <Text>Dimero D: {props.paciente.estadoClinico.dimeroD}</Text>
          <Text>Linfopenia: {props.paciente.estadoClinico.linfopenia}</Text>
          <Text>Proteína C reactiva: {props.paciente.estadoClinico.proteniaC}</Text>
        </View>
      </ScrollView>
    
    
    

      <View style={styles.botones}>
        <Button title="Cerrar" onPress={props.close.bind(this)} />
        <Button title="Cargar datos" onPress={openCargarDatos}/>
      </View>
    </Modal>

    
  );
}

else {
  return (
    <Modal visible={visibleCargar} animationType="slide">
    <Text style={styles.bold}>
    Cargar datos del paciente {props.paciente.nombre} {props.paciente.apellido}
  </Text>
  <ScrollView>
  <View style={styles.inputContainer}>
  <TextInput  style={styles.input}
    placeholder="Frecuencia respiratoria"
    onChangeText={(value) => setLecturaFrecuenciaRespiratoria(value)}
  /> 
  <TextInput  style={styles.input}
placeholder="Saturación de oxígeno"
onChangeText={(value) => setLecturaSaturacionOxigeno(value)}

/>
<TextInput  style={styles.input}
placeholder="Saturación de oxígeno EPOC"
onChangeText={(value) => setLecturaSaturacionOxigenoEpoc(value)}
/>
<TextInput  style={styles.input}
placeholder="Oxígeno suplementario"
onChangeText={(oxigenoSuplementario) => setLecturaOxigenoSuplementario(oxigenoSuplementario)}
/>
<TextInput  style={styles.input}
placeholder="Presión sistólica"
onChangeText={(sistolitica) => setLecturaPresionSistolitica(sistolitica)}
/>
<TextInput  style={styles.input}
placeholder="Frecuencia cardiaca"
onChangeText={(frecuenciaCardiaca) => setLecturaFrecuenciaCardiaca(frecuenciaCardiaca)}
/>
 <TextInput  style={styles.input}
placeholder="Temperatura °C"
onChangeText={(temperatura) => setLecturaTemperatura(temperatura)}
/>
 <TextInput  style={styles.input}
placeholder="Refiere Disnea"
onChangeText={(disnea) => setLecturaDisnea(disnea)}
/>
 <TextInput  style={styles.input}
placeholder="Dimero D"
onChangeText={(dimeroD) => setLecturaDimero(dimeroD)}
/>

<TextInput  style={styles.input}
placeholder="Linfopenia"
onChangeText={(linfopenia) => setLecturaLinfopenia(linfopenia)}
/>
 <TextInput  style={styles.input}
placeholder="Proteína C reactiva"
onChangeText={(proteniaC) => setLecturaProteinaC(proteniaC)}
/>
 
    </View>
    </ScrollView>
    <View style={styles.internalInput}>
  
    <View style={styles.button}>
<Button title="Cancelar" color="red" onPress={closeCargarDatos} />
</View>
<View style={styles.button}>
    <Button title="Cargar"  onPress={()=> TextInputHandler()} />
    </View>
</View>
</Modal>
  )
}

}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },

  header: {},
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
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
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    borderWidth: 2,
    borderColor: "#c8e1ff",
  },

  headTable: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "bold", textAlign: "center", fontSize: 20 },

  boldi: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },

  input: {
    width: "80%",
    borderColor: "#c8e1ff",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16, paddingTop: 30, backgroundColor: "#fff" 
 
  },
  //Una view solo ocupa el tamaño que tienen sus elementos internos, como el div, por eso se le da width de 60%
  internalInput: {
    margin:45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  button: {
    width: 120,
  },

});

export default DetallePacientesComponent;
