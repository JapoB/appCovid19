import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Alert } from 'react-native'
import { View, Text, Header, Container, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.db')

export default class SignoVital extends Component {
    constructor(props) {
        super(props)
        this.state = { signos: [], search: '', loading: true }
    }


    //Se ejecuta antes de cargar el componente
    async UNSAFE_componentWillMount() {
        /* db.transaction(tx=>{
            tx.executeSql('DROP TABLE signos_vitales', [], (tx,results)=>{ console.log('signos vitales table borrada')},(tx,err)=>{})
        }) */
        db.transaction((tx) => {
            var query = 'CREATE TABLE IF NOT EXISTS signos_vitales (id INTEGER PRIMARY KEY NOT NULL, id_hospital INTEGER, id_HC INTEGER, fecha TEXT, frec_resp INTEGER, sat_oxi INTEGER, sat_epoc INTEGER,presSist INTEGER, frec_card INTEGER, temp REAL, auditoria TEXT)'
            var params = []
            tx.executeSql(query, params, (tx, results) => {
                console.log('Tabla signos vitales creada')
                this.setState({ loading: false })
            }, (tx, err) => {
                console.log('Tabla signos vitales no pudo ser creada')

            })

        });

    }


    //Se ejecuta despues de cargar el componente
    async componentDidMount() {
        const { search } = this.state
        await this.fetchData(search)
    }

    async handleSearch(val) {
        this.setState({ search: val })
        await this.fetchData(val)
    }

   

    fetchData(search) {
        db.transaction(tx => {
            var query = "SELECT * FROM signos_vitales WHERE id_HC LIKE '%" + search + "%'";
            var params = []
            tx.executeSql(query, params, (tx, results) => {

                if (results.rows._array.length > 0) {
                    this.setState({ signos: results.rows._array })

                }

            }, (tx, err) => {
                console.log('Datos signos vitales no se pudieron cargar')
            })
        })

    }

    handleAdd() {
        this.props.navigation.navigate('AddSignoVital', { dni: this.props.dni, idHospital: this.props.idHospital })
    }
        
    handleEdit(id){
        this.props.navigation.navigate('EditSignoVital', {id:id})
    }
    
    handleDelete(id){
        console.log(id)
        db.transaction(tx => {
            var query = "DELETE FROM signos_vitales WHERE id = ?";
            var params = [id]
            tx.executeSql(query, params, (tx, results) => {

                Alert.alert('El registro fue eliminado correctamente')

            }, (tx, err) => {
                Alert.alert('Los datos no se pudieron eliminar')
                console.log(err)
            })
        })
        this.fetchData(this.state.search)
    }



    render() {

        let val = ''
        this.fetchData(val)


        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >Signos Vitales</Title>
                    </Body>
                    <Right>
                        <Button
                            onPress={() => this.handleAdd()}
                        >

                            <Icon name='add-circle' style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>

                <Text style={{ textAlign: 'center' }} >Hola</Text>
                <FlatList
                    data={this.state.signos}
                    renderItem={({ item }) => {
                        return (<View style={styles.item}>
                            <View>
                                <Text style={styles.title}>Fecha: {item.fecha}</Text>
                                <Text style={styles.title}>Pres.Sistólica: {item.presSist}</Text>
                                <Text style={styles.title}>Frec.Respiratoria.: {item.frec_resp}</Text>
                                <Text style={styles.title}>Sat.Oxígeno: {item.sat_oxi}</Text>
                                <Text style={styles.title}>Sat.Oxígeno EPOC: {item.sat_epoc}</Text>
                                <Text style={styles.title}>Frec.Cardíaca: {item.frec_Card}</Text>
                                <Text style={styles.title}>Temperatura: {item.temp}</Text>
                                <Text style={styles.title}>Auditoria: {item.auditoria}</Text>
                            </View>
                            <View style={styles.buttons}>
                            <Button transparent
                                    onPress={() => this.handleEdit(item.id)}
                                    style={{marginRight:20}}                                   
                                >
                                    <FontAwesome name='edit' size={20} />
                                </Button>

                                <Button transparent
                                    onPress={() => 
                                        Alert.alert('Aviso','Esta seguro de eliminar estos datos?', [
                                            {text:'Cancelar', onPress: () => Alert.alert('Eliminación cancelada')},
                                            {text:'Eliminar', onPress: ()  =>this.handleDelete(item.id)}
                                        ])
                                        }
                                    
                                >
                                    <FontAwesome name='trash' size={20} />
                                </Button>
                                
                            </View>
                        </View>)
                    }
                    }
                    keyExtractor={item => item.id}
                />

            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%'
    },
    item: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 15,
    },
    buttons:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'flex-end'
    }
});


