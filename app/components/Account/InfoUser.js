import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props) {
	const {
		userInfo,
		userInfo: { displayName, photoURL, uid, email, providerId },
		setReloadData,
		toastRef,
		setIsLoading,
		setTextLoading
	} = props;

	const changeAvatar = async () => {
		if (providerId !== 'password') {
			toastRef.current.show(
				'No puedes cambiar el avatar cuando inicias sesion por una red social',
				2000
			);
		} else {
			const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
			if (resultPermissionCamera === 'denied') {
				toastRef.current.show('Es necesario aceptar los permisos de la galeria', 1500);
			} else {
				const result = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: true,
					aspect: [4, 3]
				});

				if (result.cancelled) {
					toastRef.current.show('Haz cerrado la galería de imágenes', 1500);
				} else {
					upLoadImage(result.uri, uid).then(() => {
						updateImage(uid);
					});
				}
			}
		}
	};

	const upLoadImage = async (uri, nameImage) => {
		setTextLoading('Actualizando Avatar');
		setIsLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
		return ref.put(blob);
	};

	const updateImage = uid => {
		firebase
			.storage()
			.ref(`avatar/${uid}`)
			.getDownloadURL()
			.then(async result => {
				const update = { photoURL: result };
				await firebase.auth().currentUser.updateProfile(update);
				setReloadData(true);
				setIsLoading(false);
			})
			.catch(() =>
				toastRef.current.show('Error al recuperar el avatar del servidor', 1500)
			);
	};

	return (
		<View style={styles.viewUserInfo}>
			<Avatar
				rounded
				size="large"
				showEditButton
				onEditPress={changeAvatar}
				containerStyle={styles.userInfoAvatar}
				source={{
					uri: photoURL
						? photoURL
						: 'https://api.adorable.io/avatars/285/abotta@adorable.io.png'
				}}
			/>
			<View>
				<Text style={styles.displayName}>{displayName ? displayName : 'Anonimo'}</Text>
				<Text>{email ? email : 'Social Login'}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold'
	}
});
