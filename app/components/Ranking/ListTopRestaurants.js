import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Icon, Image, Rating } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ListTopRestaurants(props) {
	const { restaurants, navigation, toastRef } = props;

	return (
		<FlatList
			data={restaurants}
			renderItem={restaurant => (
				<Restaurant
					restaurant={restaurant}
					navigation={navigation}
					toastRef={toastRef}
				/>
			)}
			keyExtractor={(item, index) => index.toString()}
		/>
	);
}

function Restaurant(props) {
	const { restaurant, navigation, toastRef } = props;
	const { name, description, images, rating } = restaurant.item;

	const [imageRestaurant, setImageRestaurant] = useState(null);
	const [iconColor, setIconColor] = useState('#000');
	const [place, setPlace] = useState('Restaurante en el top 5');

	useEffect(() => {
		const image = images[0];
		firebase
			.storage()
			.ref(`restaurant-images/${image}`)
			.getDownloadURL()
			.then(response => {
				setImageRestaurant(response);
			});
	}, []);

	useEffect(() => {
		if (restaurant.index === 0) {
			setIconColor('#efb819');
			setPlace('Restaurante en primer lugar');
		} else if (restaurant.index === 1) {
			setIconColor('#C7C8CA');
			setPlace('Restaurante en segundo lugar');
		} else if (restaurant.index === 2) {
			setIconColor('#cd7f32');
			setPlace('Restaurante en tercer lugar');
		}
	}, []);

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('restaurant', {
					restaurant: restaurant.item
				})
			}
		>
			<Card containerStyle={styles.constainerCard}>
				<Image
					style={styles.image}
					resizeMode="cover"
					source={{ uri: imageRestaurant }}
				/>
				<View style={styles.titleRanking}>
					<Text style={styles.title}>{name}</Text>
					<Icon
						type="material-community"
						name="medal"
						color={iconColor}
						size={30}
						containerStyle={styles.containerIcon}
						onPress={() => toastRef.current.show(place)}
					/>
				</View>
				<Rating
					imageSize={15}
					startingValue={rating}
					readonly
					style={styles.rating}
				/>
				<Text style={styles.description}>{description}</Text>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	constainerCard: {
		marginBottom: 5,
		borderWidth: 0
	},
	image: {
		width: '100%',
		height: 200
	},
	titleRanking: {
		flexDirection: 'row',
		marginTop: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	rating: {
		position: 'relative',
		alignItems: 'flex-start'
	},
	description: {
		color: 'grey',
		marginTop: 0,
		textAlign: 'justify'
	},
	containerIcon: {
		position: 'absolute',
		right: 0
	}
});
