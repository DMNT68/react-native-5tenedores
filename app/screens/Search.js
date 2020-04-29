import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { useDebouncedCallback } from 'use-debounce';

// firebase config
import firebase from 'firebase/app';
import { FireSQL } from 'firesql';

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

export default function Search(props) {
	const { navigation } = props;

	const [restaurants, setRestaurants] = useState([]);
	const [search, setSearch] = useState('');

	console.log(restaurants);

	useEffect(() => {
		onSearch();
	}, [search]);

	const [onSearch] = useDebouncedCallback(() => {
		if (search) {
			fireSQL
				.query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
				.then(response => setRestaurants(response));
		}
	}, 300);

	return (
		<View>
			<SearchBar
				placeholder="Buscar restaurante..."
				onChangeText={e => setSearch(e)}
				value={search}
				containerStyle={styles.searchBar}
			/>
			{restaurants.length === 0 ? (
				<NotFoundRestaurants />
			) : (
				<FlatList
					data={restaurants}
					rederItem={restaurant => (
						<Restaurant restaurant={restaurant} navigation={navigation} />
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			)}
		</View>
	);
}

function Restaurant(props) {
	const { restaurant, navigation } = props;
	const { name, images } = restaurant.item;

	const [imageRestaurant, setImageRestaurant] = useState(null);

	useEffect(() => {
		const image = images[0];
		firebase
			.storage()
			.ref(`restaurant-images/${image}`)
			.getDownloadURL()
			.then(response => setImageRestaurant(response));
	}, []);

	return (
		<ListItem
			name={name}
			leftAvatar={{ source: { uri: imageRestaurant } }}
			rightIcon={<Icon type="material-community" name="chevron-right" />}
			onPress={() =>
				navigation.navigate('Restaurante', {
					restaurant: restaurant.item
				})
			}
		/>
	);
}

function NotFoundRestaurants() {
	return (
		<View
			style={{
				alignItems: 'center'
			}}
		>
			{/* <Image
				source={require('../../assets/img/no-result-found.png')}
				resizeMode="cover"
				style={{ width: 200, height: 200 }}
			/> */}
			<Icon
				type="material-community"
				name="food-fork-drink"
				size={100}
				color="#00a680"
			/>
			<Text style={{ fontSize: 20 }}>No hay resultado de restaurantes</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	viewBody: {
		backgroundColor: '#fff'
	},
	searchBar: {
		marginBottom: 20
	}
});
