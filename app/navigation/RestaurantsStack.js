import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Restaurants from '../screens/Restaurants';
import AddRestaurant from '../screens/Restaurants/AddRestaurant';
import Restaurant from '../screens/Restaurants/Restaurant';
import AddReviewRestaurant from '../screens/Restaurants/AddReviewRestaurant';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="restaurants"
				component={Restaurants}
				options={{ title: 'Restaurantes' }}
			/>
			<Stack.Screen
				name="add-restaurant"
				component={AddRestaurant}
				options={{ title: 'Añadir Nuevo Restaurante' }}
			/>
			<Stack.Screen
				name="restaurant"
				component={Restaurant}
				options={{ title: 'Restaurante' }}
			/>
			<Stack.Screen
				name="add-review"
				component={AddReviewRestaurant}
				options={{ title: 'Agregar Review Restaurante' }}
			/>
		</Stack.Navigator>
	);
}
