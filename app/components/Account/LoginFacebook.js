import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { facebookApi } from '../../utils/social';
import Loading from '../Loading';
import { useNavigation } from '@react-navigation/native';

export default function LoginFacebook(props) {
	const { toastRef } = props;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		setIsLoading(true);
		try {
			await Facebook.initializeAsync(facebookApi.application_id);

			const { type, token } = await Facebook.logInWithReadPermissionsAsync({
				permissions: facebookApi.permissions
			});

			if (type === 'success') {
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}`
				);
				const credentials = firebase.auth.FacebookAuthProvider.credential(token);
				await firebase
					.auth()
					.signInWithCredential(credentials)
					.then(() => navigation.navigate('my-account'))
					.catch(() => {
						toastRef.current.show(
							'Error accediendo con Facebook... intentelo mas tarde'
						);
					});
				Alert.alert(
					'Inicio de sesión correcto',
					`Hola ${(await response.json()).name}!`
				);
			} else {
				if (type === 'cancel') {
					toastRef.current.show('Inicio de sesión cancelado');
				}
			}
		} catch ({ message }) {
			toastRef.current.show(`Error desconocido, intentolo más tarde: ${message}`);
		}
		setIsLoading(false);
	};

	return (
		<View style={{ marginBottom: 10 }}>
			<SocialIcon title="Iniciar sesión" button type="facebook" onPress={login} />
			<Loading isVisible={isLoading} text="iniciando sesión" />
		</View>
	);
}
