import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Image, Input, Button, Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const WidthScreen = Dimensions.get('window').width;

export default function AddRestaurantForm(props) {
	const { navigation, toastRef, setIsLoading } = props;

	const [imagesSelected, setImagesSelected] = useState([]);

	const [restaurantName, setRestaurantName] = useState('');
	const [restaurantAddress, setRestaurantAddress] = useState('');
	const [restaurantDescription, setRestaurantDescription] = useState('');

	return (
		<ScrollView>
			<ImageRestaurant imageRestaurant={imagesSelected[0]} />
			<FormAdd
				setRestaurantName={setRestaurantName}
				setRestaurantAddress={setRestaurantAddress}
				setRestaurantDescription={setRestaurantDescription}
			/>
			<UploadImage
				imagesSelected={imagesSelected}
				setImagesSelected={setImagesSelected}
				toastRef={toastRef}
			/>
		</ScrollView>
	);
}

function ImageRestaurant(props) {
	const { imageRestaurant } = props;
	return (
		<View style={styles.viewPhoto}>
			{imageRestaurant ? (
				<Image
					source={{ uri: imageRestaurant }}
					style={{ width: WidthScreen, height: 200 }}
				/>
			) : (
				<Image
					source={require('../../../assets/img/no-image.png')}
					style={{ width: WidthScreen, height: 200 }}
				/>
			)}
		</View>
	);
}

function UploadImage(props) {
	const { imagesSelected, setImagesSelected, toastRef } = props;

	const imageSelect = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
		if (resultPermissionCamera === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permisos de la galeria, si los haz rechazado tienes que ir ha ajustes y activarlos manualmente',
				3000
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3]
			});
			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galería de imágenes', 1500);
			} else {
				setImagesSelected([...imagesSelected, result.uri]);
			}
		}
	};

	const removeImage = image => {
		const arrayImages = imagesSelected;
		Alert.alert(
			'Eliminar Imagen',
			'¿Estás seguro de que quieres eliminar la imagen?',
			[
				{
					text: 'Cancel',
					style: 'Cancel'
				},
				{
					text: 'Eliminar',
					onPress: () =>
						setImagesSelected(
							arrayImages.filter(imageUrl => imageUrl !== image)
						)
				}
			],
			{ cancelable: false }
		);
	};

	return (
		<View style={styles.viewImage}>
			{imagesSelected.length < 5 && (
				<Icon
					type="material-community"
					name="camera"
					color="#7a7a7a"
					containerStyle={styles.containerIcon}
					onPress={imageSelect}
				/>
			)}
			{imagesSelected.map((imageRestaurant, index) => (
				<Avatar
					key={index}
					onPress={() => removeImage(imageRestaurant)}
					style={styles.miniatureStyle}
					source={{ uri: imageRestaurant }}
				/>
			))}
		</View>
	);
}

function FormAdd(props) {
	const { setRestaurantName, setRestaurantAddress, setRestaurantDescription } = props;
	return (
		<View style={styles.viewForm}>
			<Input
				placeholder="Nombre del restaurante"
				containerStyle={styles.input}
				onChange={e => setRestaurantName(e.nativeEvent.text)}
			/>
			<Input
				placeholder="Dirección"
				containerStyle={styles.input}
				rightIcon={{
					type: 'material-community',
					name: 'google-maps',
					color: '#c2c2c2',
					onPress: () => console.log('Selecciona la ubicación')
				}}
				onChange={e => setRestaurantAddress(e.nativeEvent.text)}
			/>
			<Input
				placeholder="Descripción del restaurante"
				multiline={true}
				inputContainerStyle={styles.textArea}
				onChange={e => setRestaurantDescription(e.nativeEvent.text)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	viewImage: {
		flexDirection: 'row',
		marginRight: 20,
		marginLeft: 20,
		marginTop: 30
	},
	containerIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 70,
		width: 70,
		backgroundColor: '#e3e3e3',
		marginRight: 10
	},
	miniatureStyle: {
		width: 70,
		height: 70,
		marginRight: 10
	},
	viewPhoto: {
		alignItems: 'center',
		height: 200,
		marginBottom: 20
	},
	viewForm: {
		marginLeft: 10,
		marginRight: 10
	},
	input: {
		marginBottom: 10
	},
	textArea: {
		height: 100,
		width: '100%',
		padding: 0,
		margin: 0
	}
});
