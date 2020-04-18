import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/Restaunrants/AddRestaurantForm';

export default function AddRestaurant(props) {
	const { navigation, route } = props;
	const { setIsReloadRestaurants } = route.params;
	const [isLoading, setIsLoading] = useState(false);

	const toastRef = useRef();

	return (
		<View>
			<AddRestaurantForm
				navigation={navigation}
				toastRef={toastRef}
				setIsLoading={setIsLoading}
				setIsReloadRestaurants={setIsReloadRestaurants}
			/>
			<Loading isVisible={isLoading} text="Creando Restaurante" />
			<Toast ref={toastRef} position="bottom" positionValue={200} opacity={0.8} />
		</View>
	);
}
