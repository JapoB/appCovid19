import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Label, Icon, Left, Button, Body, Title, View, Text, Input } from 'native-base';


import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

export default function SignoVital(props) {

    const [id, setId] = useState(props.id)
    const [idHospital, setIdHospital] = useState('')
    const [idHC, setIdHC] = useState('')
    const [fecha, setFecha] = useState('')
    const [frecResp, setFrecResp] = useState('')
    const [satOxi, setSatOxi] = useState('')
    const [satEpoc, setSatEpoc] = useState('')
    const [presSist, setPresSist] = useState('')
    const [frecCard, setFrecCard] = useState('')
    const [temp, setTemp] = useState('')
    const [auditoria, setAuditoria] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{

            checkId(id)
            fetch(id)
        }
    )
    function checkId(id){
                    if (id == undefined ) {
                        props.navigation.navigate('EditSignoVital')
                    }

    }

    function fetch(id){

        Alert.alert('editar dato id: '+id)


    }
    function submit() {
        if (frecResp == '' || satOxi == '' || satEpoc == '' || presSist == '' || frecCard == '' || temp == '') {
            Alert.alert('Los campos marcados con * son obligatorios')
        } else {
            var date = new Date()
            date = date.toString()
            console.log(date)
            setFecha(date)
            db.transaction((tx) => {
                var query = 'INSERT INTO signos_vitales (id, id_hospital, id_HC, fecha, frec_resp, sat_oxi, sat_epoc, presSist, frec_card, temp, auditoria) VALUES (null, ?,?,?,?,?,?,?,?,?,?)'
                var params = [idHospital, idHC, fecha, frecResp, satOxi, satEpoc, presSist, frecCard, temp, auditoria]
                tx.executeSql(query, params, (tx, results) => {

                }, (tx, err) => { })
            }, (err) => { }, () => {
                console.log('Carga de dato ok')
                Alert.alert('Datos cargados correctamente')
                handleBack()
            })
        }
    }

    function handleBack() {
        setFrecCard('')
        setFrecResp('')
        setSatOxi('')
        setSatEpoc('')
        setPresSist('')
        setTemp('')
        setAuditoria('')
        props.navigation.navigate('SignoVital')
    }

    return (

        <Container style={styles.container}>
            <Header>
                <Left>
                    <Button transparent
                        onPress={() => handleBack()}
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
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text><Text style={{ color: 'red' }}>*</Text> campo obligatorio</Text>
                    </View>
                    <Item floatingLabel>
                        <Label>Frecuencia respiratoria <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setFrecResp(val) }}
                            value={frecResp}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Sat. Oxígeno <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setSatOxi(val) }}
                            value={satOxi}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Sat. Oxíg. EPOC <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setSatEpoc(val) }}
                            value={satEpoc}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Presión Sistólica <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setPresSist(val) }}
                            value={presSist}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Frecuencia Cardíaca <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setFrecCard(val) }}
                            value={frecCard}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Temperatura <Text style={{ color: 'red' }}>*</Text></Label>
                        <Input
                            onChangeText={(val) => { setTemp(val) }}
                            value={temp}
                        />
                    </Item>

                    <Item floatingLabel last>
                        <Label>Auditoria</Label>
                        <Input
                            onChangeText={(val) => { setAuditoria(val) }}
                            value={auditoria}
                        />
                    </Item>

                    <View style={styles.button}>
                        <Button
                            onPress={() => { submit() }}
                        >
                            <Text >Guardar</Text>
                        </Button>
                    </View>

                </Form>
            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        marginTop: 25,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

