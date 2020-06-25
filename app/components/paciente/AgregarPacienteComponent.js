import React, {useState} from "react";
import {Alert,
    StyleSheet,
  } from "react-native";
  import { Container, Header, Content, Form, Item, Label, Icon, Left, Button, Body, Title, View, Text, Input } from 'native-base';
//import HeaderComponent from "../compartido/HeaderComponent"
import { db } from "../../utils/baseDatos/Querys";


const AgregarPacienteComponent = (props) =>{

    const [idHospital, setIdHospital] = useState(1) // Aca poner el hospital del usuario
    const [numerHc, setnumerHC] = useState('') 
    const [fechaNac, setFechaNac] = useState('2000-01-01')
    const [tipoDoc, setTipoDoc] = useState('')
    const [pais, setPais] = useState('')
    const [numDoc, setNumDoc] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [sexo, setSexo] = useState('')
    const [calle, setCalle] = useState('')
    const [numero, setNumero] = useState('')
    const [piso, setPiso] = useState('')
    const [cp, setCp] = useState('')
    const [telefono1, setTelefono1] = useState('')
    const [telefono2, setTelefono2] = useState('')
    const [telefono3, setTelefono3] = useState('')
    const [gravedad, setGravedad] = useState('1');
    const [confianza, setCnfianza] = useState('100')
    const [auditoria, setAuditoria] = useState('1') //aca va el cuit del usuario que esta cargando
    const [icc, setIcc] = useState('no')
    const [epoc, setEpoc] = useState('no')
    const [diabetes, setDiabetes] = useState('no')
    const [hipertension, setHipertencion] = useState('no')
    const [renal, setRenal] = useState('no')
    const [depto, setDepto] = useState('')


  const submit = () => {
    {
      if (nombre == '' || apellido == '' || tipoDoc == '' ||
      numerHc == '' || numero == '' || nacionalidad == '' || sexo == ''
      ) {
        Alert.alert('Todos los campos son obligatorios')
      }else{
        var hoy = '2020-01-01'; //tomar la fecha de hoy del sistema en un formato que sirva para sqlite
     
        //Mas adelante cambiar auditoria por el cuil del usuario activo
        db.transaction((tx)=>{
         var query =" Insert into Paciente (dni, tipoDocumento,numeroHC,nombre,apellido,genero,"+
                "paisExp,nacionalidad,calle,numero,piso,depto,CP,telefono,telefonoFamiliar,telefonoFamiliar2,"+
                "fechaNac,fechaIngreso,gravedad,nivelConfianza,auditoriaCormobilidades,iccGrado2,epoc,diabetesDanioOrgano,"+
                "hipertension,enfermedadRenalCronica,idHospital)"+
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    
          var params = [numDoc,tipoDoc, numerHc,nombre,apellido,sexo,pais,nacionalidad,calle,numero,piso,depto,cp,telefono1,telefono2,
            telefono3, fechaNac, hoy,gravedad,confianza,auditoria,icc,epoc,diabetes,hipertension,renal,'1']
          tx.executeSql(query, params, (tx, results)=>{
            
          },(tx, err)=>{console.log("Error al insertar en Paciente "+err)})
        },(err)=>{console.log("Error al insertar en Paciente "+err)},()=>{
          console.log('Carga de dato ok')
          Alert.alert('Datos cargados correctamente')
          handleBack()
        })
      }
    }
  }

    return (
        <Container style={styles.container}>
{/*           <HeaderComponent title={'Agregar Nuevo Paciente'} subTittle={''} navigation={props.navigation} ruta = {'Home'}></HeaderComponent>
 */}


           <Content style={styles.container}>
        <Form>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <Text><Text style={{color:'red'}}>*</Text> campo obligatorio</Text>
          </View>
          <Item floatingLabel>
            <Label>Nombre <Text style={{color:'red'}}>*</Text></Label>
            <Input
              onChangeText={(val) => {setNombre(val)}}
              value={nombre}
              />
            </Item>

            <Item floatingLabel>
            <Label>Apellido <Text style={{color:'red'}}>*</Text></Label>
            <Input 
             onChangeText={(val) => {setApellido(val)}}
             value={apellido}
             />
          </Item>

          <Item floatingLabel>
            <Label>Tipo Documento <Text style={{color:'red'}}>*</Text></Label>
            <Input 
             onChangeText={(val) => {setTipoDoc(val)}}
             value={tipoDoc}
             />
          </Item>

          <Item floatingLabel>
            <Label>Numero Documento <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setNumDoc(val)}}
            value={numDoc}
            />
          </Item>

          <Item floatingLabel>
            <Label>Numero Historia Clinica <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setnumerHC(val)}}
            value={numerHc}
            />
          </Item>

          <Item floatingLabel>
            <Label>Nacionalidad <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setNacionalidad(val)}}
            value={nacionalidad}
            />
          </Item>

          <Item floatingLabel>
            <Label>Sexo Biologico (M o F) <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setSexo(val)}}
            value={sexo}
            />
          </Item>

        

          <Item floatingLabel last>
            <Label>Calle (direccion)</Label>
            <Input 
            onChangeText={(val) => {setCalle(val)}}
            value={calle}
            />
          </Item>
       
          <Item floatingLabel last>
            <Label>Numero (direccion)</Label>
            <Input 
            onChangeText={(val) => {setNumero(val)}}
            value={numero}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Piso (direccion)</Label>
            <Input 
            onChangeText={(val) => {setPiso(val)}}
            value={piso}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Departamento (direccion)</Label>
            <Input 
            onChangeText={(val) => {setDepto(val)}}
            value={depto}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Pais de expedicion</Label>
            <Input 
            onChangeText={(val) => {setPais(val)}}
            value={pais}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Codigo Postal </Label>
            <Input 
            onChangeText={(val) => {setCp(val)}}
            value={cp}
            />
          </Item>


          <Item floatingLabel last>
            <Label>Telefono </Label>
            <Input 
            onChangeText={(val) => {setTelefono1(val)}}
            value={telefono1}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Telefono Familiar </Label>
            <Input 
            onChangeText={(val) => {setTelefono2(val)}}
            value={telefono2}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Telefono Familiar 2</Label>
            <Input 
            onChangeText={(val) => {setTelefono3(val)}}
            value={auditoria}
            />
          </Item>


          <View style={styles.button}>
            <Button
              onPress={()=>{submit()}}
            >
              <Text >Guardar</Text>
            </Button>
            
          </View>

        </Form>
      </Content>
        </Container>
    )

}



const styles = StyleSheet.create({
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
      }
  });
  

export  default AgregarPacienteComponent;