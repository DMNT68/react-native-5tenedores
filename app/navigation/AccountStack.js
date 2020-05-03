import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import MyAccount from '../screens/Account/MyAccount';
import Login from '../screens/Account/Login';
import Register from '../screens/Account/Register';

const Stack = createStackNavigator();

export default function AccountStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="my-account"
				component={MyAccount}
				options={{ title: 'Mi Cuenta' }}
			/>
			<Stack.Screen
				name="login"
				component={Login}
				options={{ title: 'Iniciar Sesión' }}
			/>
			<Stack.Screen
				name="register"
				component={Register}
				options={{ title: 'Registro' }}
			/>
		</Stack.Navigator>
	);
}
