import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { validateEmail } from '../../utils/validation';
import Loading from '../Loading';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm(props) {
	const navigation = useNavigation();

	const { toastRef } = props;

	const [hidePassword, setHidePassword] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisibleLoading, setIsVisibleLoading] = useState(false);

	const login = async () => {
		setIsVisibleLoading(true);
		if (!email || !password) {
			toastRef.current.show('Todos los campos son obligatórios');
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('El email no es correcto');
			} else {
				await firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => navigation.navigate('my-account'))
					.catch(() => toastRef.current.show('Email o contraseña incorrecto'));
			}
		}
		setIsVisibleLoading(false);
	};

	return (
		<View style={styles.formContainer}>
			<Input
				placeholder="Correo Electrónico"
				containerStyle={styles.inputForm}
				onChange={e => setEmail(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name="at"
						iconStyle={styles.iconRight}
					/>
				}
			/>
			<Input
				placeholder="Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={hidePassword}
				onChange={e => setPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={styles.iconRight}
						onPress={() => setHidePassword(!hidePassword)}
					/>
				}
			/>
			<Button
				title="Iniciar Sesión"
				containerStyle={styles.btnContainerLogin}
				buttonStyle={styles.btnLogin}
				onPress={login}
			/>
			<Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%'
	},
	iconRight: {
		color: '#c1c1c1'
	},
	btnContainerLogin: {
		marginTop: 20,
		width: '95%'
	},
	btnLogin: {
		backgroundColor: '#00a680'
	}
});
