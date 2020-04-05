import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDwIyafMVII1c0nzz6Sd2ZpjHdy4g3aTQ0',
	authDomain: 'tenedores-3f76a.firebaseapp.com',
	databaseURL: 'https://tenedores-3f76a.firebaseio.com',
	projectId: 'tenedores-3f76a',
	storageBucket: 'tenedores-3f76a.appspot.com',
	messagingSenderId: '264381927221',
	appId: '1:264381927221:web:ee2668f0051f578a28867c'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
