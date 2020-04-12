import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import * as firebase from 'firebase';

export default function RestaurantsScreen(props) {
	const { navigation } = props;

	const [user, setUser] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(userInfo => setUser(userInfo));
	}, []);

	return (
		<View style={styles.viewBody}>
			<Text>Estamos en restaurants</Text>
			{user && <AddRestaurantButton navigation={navigation} />}
		</View>
	);
}
function AddRestaurantButton(props) {
	const { navigation } = props;
	const actions = [
		{
			text: 'Agregar Restaurante',
			icon: (
				<Icon
					type="material-community"
					name="silverware"
					iconStyle={styles.icon}
				/>
			),
			name: 'AddRestaurant',
			position: 1,
			color: '#00a680'
		}
	];
	return (
		<FloatingAction
			actions={actions}
			color="#00a680"
			onPressItem={name => {
				navigation.navigate('Nuevo Restaurante');
			}}
		/>
	);
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	icon: {
		color: '#fff'
	}
});
