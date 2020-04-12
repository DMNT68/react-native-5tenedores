import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCMDrG4EVFk3Oh_l9O_qYEQi6jV1HFUTVQ',
	authDomain: 'tenedores-ed850.firebaseapp.com',
	databaseURL: 'https://tenedores-ed850.firebaseio.com',
	projectId: 'tenedores-ed850',
	storageBucket: 'tenedores-ed850.appspot.com',
	messagingSenderId: '468614830111',
	appId: '1:468614830111:web:915476cab2005315045d2a'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
