import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// React native elements
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';

// Stacks
import RestaurantsStack from './RestaurantsStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import FavoritesStack from './FavoritesStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="restaurants"
				tabBarOptions={{
					activeTintColor: '#00a680',
					inactiveTintColor: '#646464',
					keyboardHidesTabBar: true
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color)
				})}
			>
				<Tab.Screen
					name="restaurants"
					component={RestaurantsStack}
					options={{ title: 'Restaurantes' }}
				/>
				<Tab.Screen
					name="favorites"
					component={FavoritesStack}
					options={{
						title: 'Favoritos'
						// tabBarIcon: ({ color, size }) => (
						// 	<MaterialCommunityIcons
						// 		name="heart-outline"
						// 		color={color}
						// 		size={size}
						// 	/>
						// )
					}}
				/>
				<Tab.Screen
					name="ranking"
					component={TopRestaurantsStack}
					options={{ title: 'Ranking' }}
				/>
				<Tab.Screen
					name="search"
					component={SearchStack}
					options={{ title: 'Buscar' }}
				/>
				<Tab.Screen
					name="account"
					component={AccountStack}
					options={{ title: 'Cuenta' }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

function screenOptions(route, color) {
	let iconName;
	switch (route.name) {
		case 'restaurants':
			iconName = 'home-outline';
			break;
		case 'favorites':
			iconName = 'heart-outline';
			break;
		case 'ranking':
			iconName = 'star-outline';
			break;
		case 'search':
			iconName = 'magnify';
			break;
		case 'account':
			iconName = 'account-circle-outline';
			break;

		default:
			break;
	}
	return <Icon type="material-community" name={iconName} size={24} color={color} />;
}
