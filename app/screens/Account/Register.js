import React, { useRef } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/Account/RegisterForm';
import Toast from 'react-native-easy-toast';

export default function Register() {
	const toastRef = useRef();
	return (
		<View>
			<KeyboardAwareScrollView>
				<Image
					source={require('../../../assets/img/logo.png')}
					style={styles.logo}
					resizeMode="contain"
				/>
				<View style={styles.viewForm}>
					<RegisterForm toastRef={toastRef} />
				</View>
			</KeyboardAwareScrollView>
			<Toast ref={toastRef} position="bottom" positionValue={200} opacity={0.8} />
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20
	},
	viewForm: {
		marginRight: 40,
		marginLeft: 40
	}
});
