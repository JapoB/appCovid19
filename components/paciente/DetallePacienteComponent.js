import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { db } from "../../baseDatos/Querys";
import { Container, Header, Content, Form, Item,View,Text, Button,Label, Icon, Left, Body, Title,  Input } from 'native-base';



const DetallePacientesComponent = (props) => {
  



  useEffect(() => {
    joins();
   
  }, [props, paciente]);

  useEffect(()=> {
    setEdad(calcularEdad)
  }, [paciente]
  )

  const joins = async () => {
    if (db != null) {
      setPaciente(null);
      await db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Paciente JOIN SignosVitales ON Paciente.numeroHC = SignosVitales.numeroHC AND paciente.idHospital = SignosVitales.id_hospital" +
            " JOIN Laboratorio ON Paciente.numeroHC = Laboratorio.numeroHC AND Paciente.idHospital = Laboratorio.idHospital" +
            " JOIN PacienteCama ON Paciente.numeroHC = PacienteCama.numeroHC AND Paciente.idHospital = PacienteCama.idHospital" +
            " JOIN Cormobilidades ON Paciente.numeroHC = Cormobilidades.numeroHC AND Paciente.idHospital = Cormobilidades.idHospital" +
            " JOIN Alerta ON Paciente.numeroHC = Alerta.numeroHC AND Paciente.idHospital = Alerta.idHospital" +
            " WHERE Paciente.numeroHC = ? AND Paciente.idHospital = ?",
          [props.numeroHC, props.idHospital],
          (tx, results) => {
            var len = results.rows.length;
            if ((i = 0)) {
              setPaciente(null);
            }

            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(row)
              setPaciente(row);
              setEdad(calcularEdad)
            }
          },
          (tx, err) => {
            console.log(err);
            setPaciente(null);
          }
        );
      });
    }
  };

  const sqlQueryInsertIntoSignosVitales = () =>{
    {
      if (lecturaFrecuenciaRespiratoria == '' || lecturaSaturacionOxigeno == '' || lecturaSaturacionOxigenoEpoc == '' ||
      lecturaOxigenoSuplementario == '' || lecturaPresionSistolitica == '' || lecturaFrecuenciaCardiaca == '' || lecturaFrecuenciaCardiaca == ''
      || lecturaLinfopenia == ''
      || lecturaDimero == ''
      || lecturaProteinaC == ''
      || lecturaTemperatura == '') {
        Alert.alert('Todos los campos son obligatorios')
      }else{
     
        //Mas adelante cambiar auditoria por el cuil del usuario activo
        db.transaction((tx)=>{
          var date = new Date()
          date = date.toString()
          auditoria = '1'
          var query = 'INSERT INTO SignosVitales (id_hospital,numeroHc,fecha,fec_resp,sat_oxi,sat_epoc,presSist,frec_card,temp,auditoria) (null, ?,?,?,?,?,?,?,?,?,?)'
          var params = [paciente.idHospital, paciente.numeroHC, date, lecturaFrecuenciaRespiratoria, lecturaSaturacionOxigeno,
            lecturaSaturacionOxigenoEpoc, lecturaPresionSistolitica, lecturaFrecuenciaCardiaca, lecturaTemperatura, auditoria]
          tx.executeSql(query, params, (tx, results)=>{
            
          },(tx, err)=>{})
        },(err)=>{},()=>{
          console.log('Carga de dato ok')
          Alert.alert('Datos cargados correctamente')
          handleBack()
        })
      }
    }
  };


  const [visibleCargar, setVisibleCargar] = useState(false);
  const [paciente, setPaciente] = useState(joins);
  const [edad, setEdad] = useState(1)
  
  const [lecturaFrecuenciaRespiratoria, setLecturaFrecuenciaRespiratoria] = useState(0)
  const [lecturaSaturacionOxigeno, setLecturaSaturacionOxigeno] = useState(0)
  const [lecturaSaturacionOxigenoEpoc, setLecturaSaturacionOxigenoEpoc] = useState(0)
  const [lecturaOxigenoSuplementario, setLecturaOxigenoSuplementario] = useState(0)
  const [lecturaPresionSistolitica, setLecturaPresionSistolitica] = useState(0)
  const [lecturaFrecuenciaCardiaca, setLecturaFrecuenciaCardiaca] = useState(0)
  const [lecturaLinfopenia, setLecturaLinfopenia] = useState(0)
  const [lecturaDimero, setLecturaDimero] = useState(0)
  const [lecturaDisnea, setLecturaDisnea] = useState(0)
  const [lecturaProteinaC, setLecturaProteinaC] = useState(0)
  const [lecturaTemperatura, setLecturaTemperatura] = useState(0)  



  const openCargarDatos = () => {
    setVisibleCargar(true);
  };
  const closeCargarDatos = () => {
    setVisibleCargar(false);
  };

  const TextInputHandler = () => {

    if (!(lecturaFrecuenciaRespiratoria == '' || lecturaSaturacionOxigeno == '' || lecturaSaturacionOxigenoEpoc == '' ||
    lecturaOxigenoSuplementario == '' || lecturaPresionSistolitica == '' || lecturaFrecuenciaCardiaca == '' || lecturaFrecuenciaCardiaca == ''
    || lecturaLinfopenia == ''
    || lecturaDimero == ''
    || lecturaProteinaC == ''
    || lecturaTemperatura == '')) {

    let updatePaciente = paciente;
    updatePaciente = {
      ...updatePaciente,
        frec_resp: lecturaFrecuenciaRespiratoria,
        sat_oxi: lecturaSaturacionOxigeno,
        sat_epoc: lecturaSaturacionOxigenoEpoc,
        oxigenoSuplementario: lecturaOxigenoSuplementario,
        presSist: lecturaPresionSistolitica,
        frec_card: lecturaFrecuenciaCardiaca,
        temp: lecturaTemperatura,
        dimeroD: lecturaDimero,
        linfopenia: lecturaLinfopenia,
        proteinaC: lecturaProteinaC,
      }
    
      console.log("update paciente ",updatePaciente)
      
    calcularValor(updatePaciente);
  }
  else{
    Alert.alert('Todos los campos son obligatorios')
    setVisibleCargar(false);
  }
  };

  const calcularValor = (updatePaciente) => {
    let llega3 = false;
    let valor = 0;

    if (edad >= 60 && edad <= 64) valor++;
    if (edad > 65) valor += 2;
    if (updatePaciente.genero == "M") valor++;
    if (updatePaciente.iccGrado2 == "si") valor++;
    if (updatePaciente.epoc == "si") valor++;
    if (updatePaciente.diabetesDanioOrgano == "si") valor++;
    if (updatePaciente.oxigenoSuplementario == "si") valor += 3;
    llega3 = true;
  //  if (updatePaciente.disnea == "si") valor += 2;
    if (updatePaciente.frec_resp <= 8) valor += 3;
    llega3 = true;
    if (
      updatePaciente.frec_resp <= 11 &&
      updatePaciente.frec_resp > 8
    )
      valor += 1;
    if (
      updatePaciente.frec_resp <= 24 &&
      updatePaciente.frec_resp > 20
    )
      valor += 2;
    if (updatePaciente.frec_resp > 24) valor += 3;
    llega3 = true;
    if (updatePaciente.sat_oxi <= 91) valor += 3;
    llega3 = true;
    if (
      updatePaciente.sat_oxi >= 92 &&
      updatePaciente.sat_oxi <= 93
    )
      valor += 2;
    if (
      updatePaciente.sat_oxi >= 94 &&
      updatePaciente.sat_oxi <= 95
    )
      valor += 1;
    //oxigeno Epoc
    if (updatePaciente.sat_epoc <= 83) valor += 3;
    llega3 = true;
    if (
      updatePaciente.sat_epoc >= 84 &&
      updatePaciente.sat_epoc <= 86
    )
      valor += 2;
    if (
      updatePaciente.sat_epoc >= 87 &&
      updatePaciente.sat_epoc <= 88
    )
      valor += 1;
    if (updatePaciente.presSist <= 90) valor += 3;
    llega3 = true;
    if (updatePaciente.presSist >= 220) valor += 3;
    llega3 = true;
    if (updatePaciente.frec_card <= 40) valor += 3;
    llega3 = true;
    if (
      updatePaciente.frec_card >= 41 &&
      updatePaciente.frec_card <= 50
    )
      valor += 1;
    if (
      updatePaciente.frec_card >= 91 &&
      updatePaciente.frec_card <= 110
    )
      valor += 1;
    if (
      updatePaciente.frec_card >= 111 &&
      updatePaciente.frec_card <= 130
    )
      valor += 2;
    if (updatePaciente.frec_card > 131) valor += 3;
    llega3 = true;
    if (updatePaciente.temp <= 35) valor += 3;
    llega3 = true;
    if (
      updatePaciente.temp >= 35 &&
      updatePaciente.temp <= 35.5
    )
      valor += 1;
    if (
      updatePaciente.temp >= 38 &&
      updatePaciente.temp <= 39
    )
      valor += 1;
    if (updatePaciente.temp > 39) valor += 2;
    if (updatePaciente.dimeroD > 1000) valor += 1;
    if (
      updatePaciente.linfopenia < 1000 &&
      updatePaciente.linfopenia >= 500
    )
      valor += 1;

    if (updatePaciente.linfopenia < 500) valor += 2;

    if (updatePaciente.proteniaC > 100) valor += 1;

    console.log(valor);
    let urgencia = "Sin riesgo";
    if (valor >= 3 && valor <= 4) {
      urgencia = "Bajo";
    }
    if ((valor >= 5 && valor <= 7) || llega3) {
      urgencia = "Moderado";
    }
    if (valor >= 8) {
      urgencia = "Alto";
    }
    updatePaciente = {
      ...updatePaciente,
        gravedad: valor,
        calificacion: urgencia,
    };

   setPaciente(updatePaciente);

    //Aca hay que hacer la alerta y la replicacion
   sqlQueryInsertIntoSignosVitales()

    setVisibleCargar(false);
  };


  

  const calcularEdad = () => {
    var age = 0;
    
    if(paciente!=null){
    var today = new Date();
    var birthDate = new Date(paciente.fechaNac);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
  }
    return age;
  }


  /**
   *
   * VER DE DONDE CARAJO SALE LA REFIERE DISNEA, NO ESTA EN LAS TABLAS
   */



  if (!visibleCargar) {
    if (paciente != null) {
      return (
        <Container animationType="slide" style={styles.container}>

        <Header>
             <Left>
          <Button transparent
            onPress={() => props.navigation.navigate('TablaPaciente')}
          >
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Detalles de Paciente</Title>
          <Title>{paciente.nombre} {paciente.apellido} HC: {props.numeroHC}</Title>
        </Body>
             </Header>

             <Content style={styles.container}> 
          <ScrollView style={styles.container}>
            

            <View style={styles.item}>
              
              <Text style={styles.boldi}>Datos Personales</Text>
              <Text>Numero Historia Clinica: {paciente.numeroHC}</Text>
              <Text>Nombre: {paciente.nombre}</Text>
              <Text>Apellido: {paciente.apellido}</Text>
              <Text>Dni: {paciente.dni}</Text>
              <Text>Genero: {paciente.genero}</Text>
              <Text>Edad: {edad}</Text>
              
              
          <Text style={styles.boldi}>Ultimos datos clinicos</Text>
          <Text>Urgencia: {paciente.calificacion} ({paciente.gravedad})</Text>
         <Text>Frecuencia respiratoria: {paciente.frec_resp}</Text>
          <Text>Saturación de oxígeno: {paciente.sat_oxi}</Text>
          <Text>Saturación de oxígeno EPOC: {paciente.sat_epoc}</Text>
          <Text>Oxígeno suplementario: {paciente.oxigenoSuplementario}</Text>
          <Text>Presión sistólica: {paciente.presSist}</Text>
          <Text>Frecuencia cardiaca: {paciente.frec_card}</Text>
          <Text>Temperatura °C: {paciente.temp}</Text>
          <Text>Dimero D: {paciente.dimeroD}</Text>
          <Text>Linfopenia: {paciente.linfopenia}</Text>
          <Text>Proteína C reactiva: {paciente.proteinaC}</Text>

          
          <Text style={styles.boldi}>Cormobilidades</Text>
          <Text>ICC grado 2: {paciente.iccGrado2}</Text>
          <Text>Diabetes con daño en organo: {paciente.diabetesDanioOrgano}</Text>
          <Text>EPOC: {paciente.epoc}</Text> 
            </View>
          </ScrollView>
         
          
               <View style={styles.button}>
              <Button
              onPress={openCargarDatos}
               >
              <Text >Cargar Datos</Text>
            </Button>
        
          
          </View>
          </Content>
        </Container>
      );
    } else {
      return (
        <View>
          <Text>El paciente no tiene datos cargados</Text>
          <Button
            title="Volver"
            onPress={() => props.navigation.navigate("Pacientes")}
          />
        </View>
      );
    }
  } else {
    return (
      <Container animationType="slide" style={styles.container}>

<Header>
             <Left>
          <Button transparent
            onPress={() => closeCargarDatos()}
          >
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Cargar datos del paciente</Title>
          <Title>{paciente.nombre} {paciente.apellido} HC: {props.numeroHC}</Title>
        </Body>
             </Header>


        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Frecuencia respiratoria"
              onChangeText={(value) => setLecturaFrecuenciaRespiratoria(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Saturación de oxígeno"
              onChangeText={(value) => setLecturaSaturacionOxigeno(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Saturación de oxígeno EPOC"
              onChangeText={(value) => setLecturaSaturacionOxigenoEpoc(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Oxígeno suplementario"
              onChangeText={(oxigenoSuplementario) =>
                setLecturaOxigenoSuplementario(oxigenoSuplementario)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Presión sistólica"
              onChangeText={(sistolitica) =>
                setLecturaPresionSistolitica(sistolitica)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Frecuencia cardiaca"
              onChangeText={(frecuenciaCardiaca) =>
                setLecturaFrecuenciaCardiaca(frecuenciaCardiaca)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Temperatura °C"
              onChangeText={(temperatura) => setLecturaTemperatura(temperatura)}
            />
        {/*     <TextInput
              style={styles.input}
              placeholder="Refiere Disnea"
              onChangeText={(disnea) => setLecturaDisnea(disnea)}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Dimero D"
              onChangeText={(dimeroD) => setLecturaDimero(dimeroD)}
            />

            <TextInput
              style={styles.input}
              placeholder="Linfopenia"
              onChangeText={(linfopenia) => setLecturaLinfopenia(linfopenia)}
            />
            <TextInput
              style={styles.input}
              placeholder="Proteína C reactiva"
              onChangeText={(proteniaC) => setLecturaProteinaC(proteniaC)}
            />
          </View>
        </ScrollView>
        <View style={styles.internalInput}>
         


          <View style={styles.button}>
              <Button
              onPress={() => TextInputHandler()}
               >
              <Text >Cargar</Text>
            </Button>
        
          
          </View>


         
        </View>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
/*   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
 */

container: {
  width: '100%'
},
  button: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  //Una view solo ocupa el tamaño que tienen sus elementos internos, como el div, por eso se le da width de 60%
  internalInput: {
    margin: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
});

export default DetallePacientesComponent;
