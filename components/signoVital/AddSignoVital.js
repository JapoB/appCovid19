import React from 'react'

import { View, Text, Button } from 'react-native'
import { Header } from '@react-navigation/stack'

function AddSignoVital(props){

        return(
            <View>
                <Text>Cargar Signos Vitales </Text>
                <Button title="Volver a home" onPress={() => { props.navigation.navigate('Home') }} />
            </View>
        )
}

export default AddSignoVital