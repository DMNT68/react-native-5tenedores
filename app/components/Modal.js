import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function (props) {
	const { isVisible, setIsVisible, children } = props;

	const closeModal = () => setIsVisible(false);

	return (
		<Overlay
			isVisible={isVisible}
			windowBackgroundColor="rgba(0,0,0,0.5)"
			overlayBackgroundColor="tranparent"
			overlayStyle={styles.overlay}
			onBackdropPress={closeModal}
		>
			{children}
		</Overlay>
	);
}

const styles = StyleSheet.create({
	overlay: {
		height: 'auto',
		width: '90%',
		backgroundColor: '#fff'
	}
});
