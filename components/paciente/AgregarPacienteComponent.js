import React, {useState} from "react";
import {
    StyleSheet,
  } from "react-native";
  import { Container, Header, Content, Form, Item, Label, Icon, Left, Button, Body, Title, View, Text, Input } from 'native-base';


const AgregarPacienteComponent = (props) =>{

    const [idHospital, setIdHospital] = useState(1) // Aca poner el hospital del usuario
    const [idHC, setIdHC] = useState(props.dni)
    const [fecha, setFecha] = useState('')
    const [frecResp, setFrecResp] = useState('')
    const [satOxi, setSatOxi] = useState('')
    const [satEpoc, setSatEpoc] = useState('')
    const [presSist, setPresSist] = useState('')
    const [frecCard, setFrecCard] = useState('')
    const [temp, setTemp] = useState('')
    const [auditoria, setAuditoria] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    return (
        <Container style={styles.container}>
             <Header>
             <Left>
          <Button transparent
            onPress={() => props.navigation.navigate('Home')}
          >
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Signos Vitales</Title>
          <Title>Nombre de paciente</Title>
        </Body>
             </Header>


           <Content style={styles.container}>
        <Form>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <Text><Text style={{color:'red'}}>*</Text> campo obligatorio</Text>
          </View>
          <Item floatingLabel>
            <Label>Frecuencia respiratoria <Text style={{color:'red'}}>*</Text></Label>
            <Input
              onChangeText={(val) => {setFrecResp(val)}}
              value={frecResp}
              />
            </Item>

            <Item floatingLabel>
            <Label>Sat. Oxígeno <Text style={{color:'red'}}>*</Text></Label>
            <Input 
             onChangeText={(val) => {setSatOxi(val)}}
             value={satOxi}
             />
          </Item>

          <Item floatingLabel>
            <Label>Sat. Oxíg. EPOC <Text style={{color:'red'}}>*</Text></Label>
            <Input 
             onChangeText={(val) => {setSatEpoc(val)}}
             value={satEpoc}
             />
          </Item>

          <Item floatingLabel>
            <Label>Presión Sistólica <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setPresSist(val)}}
            value={presSist}
            />
          </Item>

          <Item floatingLabel>
            <Label>Frecuencia Cardíaca <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setFrecCard(val)}}
            value={frecCard}
            />
          </Item>

          <Item floatingLabel>
            <Label>Temperatura <Text style={{color:'red'}}>*</Text></Label>
            <Input 
            onChangeText={(val) => {setTemp(val)}}
            value={temp}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Auditoria</Label>
            <Input 
            onChangeText={(val) => {setAuditoria(val)}}
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