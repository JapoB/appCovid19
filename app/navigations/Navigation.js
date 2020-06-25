import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import PacientesStack from './PacientesStack';
import HomeStack from './HomeStack';
import AccountStack from './AccountStack';
import Login from '../screens/account/Login';


const Tab = createBottomTabNavigator();


const Navigation = () => {


	//Este estado es el logeado. Debera buscar un token o algo para recordar el usuario.
	const [isLoged, setisLoged] = useState(true);


	if(isLoged){
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="home"
				tabBarOptions={{
					inactiveTinColor: '#646464',
					activeTintColor: '#00a680'
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color)
				})}
			>
                <Tab.Screen name="home" component={HomeStack} options={{ title: 'Home' }} />
				<Tab.Screen name="pacientes" component={PacientesStack} options={{ title: 'Pacientes' }} />
				<Tab.Screen name="account" component={AccountStack} options={{ title: 'Mi Cuenta' }} />
				
			</Tab.Navigator>
		</NavigationContainer>
	);
}
else {
	return (
		<NavigationContainer>
		<Tab.Navigator
				initialRouteName="login"
				tabBarOptions={{
					inactiveTinColor: '#646464',
					activeTintColor: '#00a680'
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color)
				})}
			>
                <Tab.Screen name="login" component={Login} options={{ title: 'Login' }} />	
			</Tab.Navigator>
		</NavigationContainer>
	)
}
};

const screenOptions = (route, color) => {
	let icon;
	switch (route.name) {
		case 'pacientes':
			icon = 'compass-outline';
            break;
         case 'Fav':
			icon = 'heart-outline';
            break;
         case 'search':
			icon = 'magnify';
            break;
        case 'home':
                icon = 'home-outline';
				break;
		case 'account':
				icon = 'account-details';
				break;

		default:
			break;
	}
	return (<Icon type="material-community" name={icon} color={color} size={22}/>)
};

export default Navigation;
