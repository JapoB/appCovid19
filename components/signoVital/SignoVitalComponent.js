import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { View, Text, Header, Container, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base'

import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.db')

export default class SignoVital extends Component {
    constructor(props){
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
            }, (tx, err) => {
                console.log('Tabla signos vitales no pudo ser creada')

            })

        });

    }



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
                console.log(results.rows._array)
                if (results.rows._array.length > 0) {
                    this.setState({ signos: results.rows._array })
                    this.setState({ loading: false })
                }
                console.log('Datos cargados')
            }, (tx, err) => {
                console.log('Datos signos vitales no se pudieron cargar')
            })
        })

    }

    handleAdd() {
        this.props.navigation.navigate('AddSignoVital', {dni: this.props.dni})
    }

    render() {


        function Item({ title }) {
            return (
                <View style={styles.item}>
                    <Text style={styles.title}>Temperatura: {title}</Text>
                </View>
            );
        }

        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent
                        onPress={()=> this.props.navigation.navigate('Home')}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >Signos Vitales</Title>
                    </Body>
                    <Right>
                        <Button
                        onPress={()=>this.handleAdd()}
                        >

                    <Icon name='add-circle' style={{color:'#fff'}} />
                        </Button>
                    </Right>
                </Header>
                
                <Text style={{textAlign:'center'}} >Hola</Text>
                <FlatList
                    data={this.state.signos}
                    renderItem={({ item }) => <Item title={item.temp} />}
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
        width:'100%'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});


