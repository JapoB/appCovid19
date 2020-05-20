import React, { useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native'



import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.db')


function SignoVital(props) {

    const [signos, setSignos] = useState([])//Almacena los signos vitales que estan cargados
  

    db.transaction((tx) => {
        var query = 'SELECT * FROM signos_vitales'
        tx.executeSql(query, [], (tx, results) => {
            if (results.rows.length > 0) {
                setSignos(results.rows._array)
            }

        }, (tx, err) => { })
    }, (err) => { }, () => { console.log(signos) })


    return (

        <View>
            <Text>Listado de Signos Vitales</Text>
            

            <FlatList
                /* data={[{nombre:'Juan', id:1},{nombre:'Dario', id:2},{nombre:'Ines', id:3}]} */
                data={signos}
                renderItem={({ item }) => (
                    <View >
                        <Text>{item.nombre}</Text>
                    </View>
                )}
                
                />

            <Button title="Volver a home" onPress={() => { props.navigation.navigate('Home') }} />
        </View>
    )

}

const styles = StyleSheet.create({
    listcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignoVital



