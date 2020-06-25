import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";

import  AccountScreen  from "../screens/account/AccountScreen";
import AccountDetails from '../screens/account/AccountDetails';

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="accountDetails" component={AccountDetails} options={{title: 'Mi cuenta - Dispositivo privado'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AccountStack;