import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/validation';
import * as firebase from 'firebase';
import Loading from '../Loading';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm(props) {
	const navigation = useNavigation();
	const { toastRef } = props;
	const [hidePassword, setHidePassword] = useState(true);
	const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
	const [isVisible, setIsVisible] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const register = async () => {
		setIsVisible(true);

		if (!email || !password || !repeatPassword) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('El email no es correcto');
			} else {
				if (password !== repeatPassword) {
					toastRef.current.show('Las contraseñas no son iguales');
				} else {
					await firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(() => navigation.navigate('Mi Cuenta'))
						.catch(err => {
							if (err.code === 'auth/email-already-in-use') {
								toastRef.current.show('Ya existe una cuenta con este email', 1500);
							} else {
								toastRef.current.show(
									'Error al crear la cuenta, intentelo más tarde',
									1500
								);
							}
						});
				}
			}
		}
		setIsVisible(false);
	};

	return (
		<View style={styles.formContainer}>
			<Input
				placeholder="Correo Eléctronico"
				containerStyle={styles.inputForm}
				onChange={e => setEmail(e.nativeEvent.text)}
				rightIcon={
					<Icon type="material-community" name="at" iconStyle={styles.iconRight} />
				}
			/>
			<Input
				placeholder="Contraseña"
				password={true}
				secureTextEntry={hidePassword}
				containerStyle={styles.inputForm}
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
			<Input
				placeholder="Repetir contraseña"
				password={true}
				secureTextEntry={hideRepeatPassword}
				containerStyle={styles.inputForm}
				onChange={e => setRepeatPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hideRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={styles.iconRight}
						onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
					/>
				}
			/>
			<Button
				title="Unirse"
				containerStyle={styles.btnContainerRegister}
				buttonStyle={styles.btnRegister}
				onPress={register}
			/>
			<Loading text="Creando cuenta" isVisible={isVisible} />
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
		width: '100%',
		marginTop: 20
	},
	iconRight: {
		color: '#c1c1c1'
	},
	btnContainerRegister: {
		marginTop: 20,
		width: '95%'
	},
	btnRegister: {
		backgroundColor: '#00a680'
	}
});
