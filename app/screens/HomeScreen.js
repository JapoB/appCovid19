import React from 'react'
import {View, Text,Image,StyleSheet,ScrollView} from 'react-native'


const HomeScreen = () => {

    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
         {/*    <Image source={require('../../assets/img/hospitalRoca.jpg')} resizeMode="contain" style={styles.image} />
            <Text style = {styles.textTitle}> Hospital Francisco Lopez Lima </Text>
            <Text style = {styles.textData}> Cantidad de Pacientes: 2</Text>
            <Text style = {styles.textData}> Cantidad de Pacientes Criticos: 0</Text>
            <Text style = {styles.textData}> Ultimos datos cargados hace 3hs 21min</Text> */}
            <Text style={styles.textTitle}> Hola Pepe </Text>
            <Text > Hospital Francisco Lopez Lima</Text>
            <Text>Notificaciones</Text>
            <Text>¿Qué vas a hacer?</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
		marginLeft: 30,
        marginRight: 30,
	},
	image: {
		height: 200,
		width: '100%',
        marginBottom: 30,
        marginTop: 40
    },
    textData: {
        textAlign: 'center',
        marginTop:10
    },
    textTitle :{
        textAlign: 'center',
        marginBottom:10,
        fontSize:20,
        fontWeight: 'bold',
        fontFamily: 'serif'
    }
})


export default HomeScreen