import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen} options={{title: 'App Covid 19'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default HomeStack;