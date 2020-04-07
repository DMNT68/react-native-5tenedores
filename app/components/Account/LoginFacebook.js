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
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: facebookApi.permissions
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}`
				);
				const credentials = firebase.auth.FacebookAuthProvider.credential(token);
				await firebase
					.auth()
					.signInWithCredential(credentials)
					.then(() => navigation.navigate('Mi Cuenta'))
					.catch(() => {
						toastRef.current.show('Error accediendo con Facebook... intentelo mas tarde');
					});
				Alert.alert('Inicio de sesión correcto', `Hola ${(await response.json()).name}!`);
			} else {
				if (type === 'cancel') {
					toastRef.current.show('Inicio de sesión cancelado');
				}
			}
		} catch ({ message }) {
			toastRef.current.show(`Facebook Login Error: ${message}`);
		}
		setIsLoading(false);
	};

	return (
		<View>
			<SocialIcon title="Iniciar sesión" button type="facebook" onPress={login} />
			<Loading isVisible={isLoading} text="iniciando sesión" />
		</View>
	);
}
