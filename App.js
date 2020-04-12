import React from 'react';
import Navigation from './app/navigation/Navigation';
import { firebaseApp } from './app/utils/firebase';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

import { decode, encode } from 'base-64';

export default function App() {
	global.crypto = require('@firebase/firestore');
	global.crypto.getRandomValues = byteArray => {
		for (let i = 0; i < byteArray.length; i++) {
			byteArray[i] = Math.floor(256 * Math.random());
		}
	};
	if (!global.btoa) {
		global.btoa = encode;
	}
	if (!global.atob) {
		global.atob = decode;
	}

	return <Navigation />;
}
