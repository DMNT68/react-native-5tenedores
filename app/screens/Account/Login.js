import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import LoginForm from '../../components/Account/LoginForm';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import LoginFacebook from '../../components/Account/LoginFacebook';

export default function Login() {
	const toastRef = useRef();
	return (
		<ScrollView style={{ backgroundColor: '#fff' }}>
			<Image
				source={require('../../../assets/img/logo.png')}
				style={styles.logo}
				resizeMode="contain"
			/>
			<View style={styles.viewContainer}>
				<LoginForm toastRef={toastRef} />
				<CreateAccount />
			</View>
			<Divider style={styles.divider} />
			<View style={styles.viewContainer}>
				<LoginFacebook toastRef={toastRef} />
			</View>
			<Toast ref={toastRef} position="bottom" positionValue={210} opacity={0.8} />
		</ScrollView>
	);
}

function CreateAccount() {
	const navigation = useNavigation();
	return (
		<Text style={styles.textRegister}>
			¿Aun no tienes una cuenta?{' '}
			<Text
				style={styles.btnRegister}
				onPress={() => navigation.navigate('register')}
			>
				Regístrate
			</Text>
		</Text>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20
	},
	viewContainer: {
		marginRight: 40,
		marginLeft: 40
	},
	textRegister: {
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10
	},
	btnRegister: {
		color: '#00a680',
		fontWeight: 'bold'
	},
	divider: {
		backgroundColor: '#00a680',
		marginTop: 20,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 20
	}
});
