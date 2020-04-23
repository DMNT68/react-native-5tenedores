import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import RestaurantsScreen from '../screens/Restaurants';
import TopRestaurantsScreen from '../screens/TopRestaurants';
import SearchScreen from '../screens/Search';
import MyAccountScreen from '../screens/Account/MyAccount';
import LoginScreen from '../screens/Account/Login';
import RegisterScreen from '../screens/Account/Register';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant';
import RestaurantScreen from '../screens/Restaurants/Restaurant';
import AddReviewRestaurant from '../screens/Restaurants/AddReviewRestaurant';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RestaurantsStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Restaurantes" component={RestaurantsScreen} />
			<Stack.Screen name="Nuevo Restaurante" component={AddRestaurantScreen} />
			<Stack.Screen name="Restaurante" component={RestaurantScreen} />
			<Stack.Screen
				name="Agregar Review Restaurante"
				component={AddReviewRestaurant}
			/>
		</Stack.Navigator>
	);
}

function TopRestaurantsStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Top 5" component={TopRestaurantsScreen} />
		</Stack.Navigator>
	);
}

function SearchRestaurantsStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Buscar" component={SearchScreen} />
		</Stack.Navigator>
	);
}

function MyAccountStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Mi Cuenta" component={MyAccountScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Registro" component={RegisterScreen} />
		</Stack.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: '#00a680',
					inactiveTintColor: '#646464',
					keyboardHidesTabBar: true
				}}
			>
				<Tab.Screen
					name="Restaurantes"
					component={RestaurantsStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="silverware-fork-knife"
								color={color}
								size={size}
							/>
						)
					}}
				/>
				<Tab.Screen
					name="Top Restaurantes"
					component={TopRestaurantsStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="star-outline"
								color={color}
								size={size}
							/>
						)
					}}
				/>
				<Tab.Screen
					name="Buscar"
					component={SearchRestaurantsStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="magnify"
								color={color}
								size={size}
							/>
						)
					}}
				/>
				<Tab.Screen
					name="Mi Cuenta"
					component={MyAccountStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="chef-hat"
								color={color}
								size={size}
							/>
						)
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
