import React, { useState, useEffect, useRef } from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
	Alert
} from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

// Components
import Loading from '../../components/Loading';

// Firabse
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
	const { navigation } = props;

	const [restaurants, setRestaurants] = useState([]);
	const [reloadRestaurants, setReloadRestaurants] = useState(false);
	const [isVisibleLoading, setIsVisibleLoading] = useState(false);
	const [userLogged, setUserLogged] = useState(false);

	firebase
		.auth()
		.onAuthStateChanged(user => (user ? setUserLogged(true) : setUserLogged(false)));

	const toastRef = useRef();

	useEffect(() => {
		navigation.addListener('focus', () => {
			setReloadRestaurants(true);
		});

		if (userLogged) {
			setRestaurants([]);
			const idUser = firebase.auth().currentUser.uid;
			db.collection('favorites')
				.where('idUser', '==', idUser)
				.get()
				.then(response => {
					const idRestaurantsArray = [];
					response.forEach(doc => {
						idRestaurantsArray.push(doc.data().idRestaurant);
					});
					getDataRestaurants(idRestaurantsArray).then(response => {
						const restaurants = [];
						response.forEach(doc => {
							let restaurant = doc.data();
							restaurant.id = doc.id;
							restaurants.push(restaurant);
						});
						setRestaurants(restaurants);
					});
				});
		}

		setReloadRestaurants(false);
	}, [reloadRestaurants]);

	const getDataRestaurants = idRestaurantsArray => {
		const arrayRestaurants = [];
		idRestaurantsArray.forEach(idRestaurant => {
			const result = db.collection('restaurants').doc(idRestaurant).get();
			arrayRestaurants.push(result);
		});
		return Promise.all(arrayRestaurants);
	};

	if (!userLogged) {
		return (
			<UserNotLogged
				setReloadRestaurants={setReloadRestaurants}
				navigation={navigation}
			/>
		);
	}

	if (restaurants.length === 0) {
		return (
			<NotFoundRestaurants
				setReloadRestaurants={setReloadRestaurants}
				navigation={navigation}
			/>
		);
	}

	return (
		<View style={styles.viewBody}>
			{restaurants ? (
				<FlatList
					data={restaurants}
					renderItem={restaurant => (
						<Restaurant
							restaurant={restaurant}
							navigation={navigation}
							setIsVisibleLoading={setIsVisibleLoading}
							setReloadRestaurants={setReloadRestaurants}
							toastRef={toastRef}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : (
				<View style={styles.loaderRestaurants}>
					<ActivityIndicator size="large" />
					<Text>Cargando restaurantes</Text>
				</View>
			)}
			<Toast ref={toastRef} position="center" opacity={0.8} />
			<Loading text="Eliminando Restaurante" isVisible={isVisibleLoading} />
		</View>
	);
}

function Restaurant(props) {
	const {
		restaurant,
		navigation,
		setIsVisibleLoading,
		setReloadRestaurants,
		toastRef
	} = props;
	const { id, name, images } = restaurant.item;

	const [imageRestaurant, setImageRestaurant] = useState(null);

	useEffect(() => {
		const image = images[0];
		firebase
			.storage()
			.ref(`restaurant-images/${image}`)
			.getDownloadURL()
			.then(result => {
				setImageRestaurant(result);
			});
	}, []);

	const confirmRemoveFavorite = () => {
		Alert.alert(
			'Eliminar restaurante de favoritos',
			'¿Deseas eliminar el restaurante de la lista de favoritos?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Eliminar',
					onPress: removeFavorite
				}
			],
			{ cancelable: false }
		);
	};

	const removeFavorite = () => {
		setIsVisibleLoading(true);
		db.collection('favorites')
			.where('idRestaurant', '==', id)
			.where('idUser', '==', firebase.auth().currentUser.uid)
			.get()
			.then(response => {
				response.forEach(doc => {
					const idFavorite = doc.id;
					db.collection('favorites')
						.doc(idFavorite)
						.delete()
						.then(() => {
							setIsVisibleLoading(false);
							setReloadRestaurants(true);
							toastRef.current.show(
								'Restaurante eliminado de la lista de favoritos'
							);
						});
				});
			})
			.catch(() => {
				setIsVisibleLoading(false);
				toastRef.current.show(
					'No se ha podido eliminar de favoritos, intentelo mas tarde'
				);
			});
	};

	return (
		<View style={styles.restaurant}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('restaurant', { restaurant: restaurant.item })
				}
			>
				<Image
					resizeMode="cover"
					source={{ uri: imageRestaurant }}
					style={styles.image}
					PlaceholderContent={<ActivityIndicator color="#fff" />}
				/>
			</TouchableOpacity>
			<View style={styles.info}>
				<Text style={styles.name}>{name}</Text>
				<Icon
					type="material-community"
					name="heart"
					color="#00a680"
					containerStyle={styles.favorite}
					onPress={confirmRemoveFavorite}
					size={40}
					underlayColor="transparent"
				/>
			</View>
		</View>
	);
}

function NotFoundRestaurants(props) {
	const { setReloadRestaurants, navigation } = props;

	useEffect(() => {
		navigation.addListener('focus', () => {
			setReloadRestaurants(true);
		});
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Icon
				type="material-community"
				name="heart-broken"
				size={100}
				iconStyle={{ color: '#00a680', marginBottom: 20 }}
			/>
			<Text style={{ fontSize: 20, fontWeight: '900', textAlign: 'center' }}>
				No tienes restaurantes en tu lista de favoritos
			</Text>
		</View>
	);
}

function UserNotLogged(props) {
	const { setReloadRestaurants, navigation } = props;

	useEffect(() => {
		navigation.addListener('focus', () => {
			setReloadRestaurants(true);
		});
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Icon
				type="material-community"
				name="account-circle-outline"
				size={100}
				iconStyle={{ color: '#00a680', marginBottom: 20 }}
			/>
			<Text style={{ fontSize: 20, fontWeight: '900', textAlign: 'center' }}>
				Necesitas tener una cuenta e iniciar sesión para ver esta sección
			</Text>
			<Button
				title="ir a login"
				onPress={() => navigation.navigate('Login')}
				containerStyle={{ marginTop: 10, width: '80%' }}
				buttonStyle={{ backgroundColor: '#00a680' }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		backgroundColor: '#f2f2f2'
	},
	loaderRestaurants: {
		marginTop: 10,
		marginBottom: 10
	},
	restaurant: {
		margin: 10
	},
	image: {
		width: '100%',
		height: 180
	},
	info: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: -30,
		backgroundColor: '#fff'
	},
	name: {
		fontWeight: 'bold',
		fontSize: 20
	},
	favorite: {
		marginTop: -35,
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 100
	}
});
