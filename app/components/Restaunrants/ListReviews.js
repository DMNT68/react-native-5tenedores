import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, VirtualizedList } from 'react-native';
import { Button, Avatar, Rating, ListItem } from 'react-native-elements';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
	const { navigation, idRestaurant, setRating } = props;

	const [reviews, setReviews] = useState([]);
	const [reviewsReload, setReviewsReload] = useState(false);
	const [userLogged, setUserLogged] = useState(false);

	firebase
		.auth()
		.onAuthStateChanged(user => (user ? setUserLogged(true) : setUserLogged(false)));

	useEffect(() => {
		(async () => {
			const resultReview = [];
			const arrayRating = [];

			db.collection('reviews')
				.where('idRestaurant', '==', idRestaurant)
				.get()
				.then(response => {
					response.forEach(doc => {
						resultReview.push(doc.data());
						arrayRating.push(doc.data().rating);
					});

					let numSum = 0;
					arrayRating.map(value => {
						numSum = numSum + value;
					});
					const countRating = arrayRating.length;
					const resultRating = numSum / countRating;
					const resultRatingFinish = resultRating ? resultRating : 0;

					setReviews(resultReview);
					setRating(resultRatingFinish);
				});

			setReviewsReload(false);
		})();
	}, [reviewsReload]);

	return (
		<View>
			{userLogged ? (
				<Button
					buttonStyle={styles.btnAddReview}
					titleStyle={styles.btnTitleAddReview}
					title="Escribir una opinión"
					icon={{
						type: 'material-community',
						name: 'square-edit-outline',
						color: '#00a680'
					}}
					onPress={() =>
						navigation.navigate('Agregar Review Restaurante', {
							idRestaurant: idRestaurant,
							setReviewsReload: setReviewsReload
						})
					}
				/>
			) : (
				<View>
					<Text style={{ textAlign: 'center', color: '#00a680', padding: 20 }}>
						Para escribir un comentario es necesario tener una cuenta y estar
						iniciado sesión.{' '}
						<Text
							style={{ fontWeight: 'bold' }}
							onPress={() => navigation.navigate('Login')}
						>
							Pulsa aquí para iniciar sesión o crear una{' '}
						</Text>
					</Text>
				</View>
			)}
			{/* <FlatList
				data={reviews}
				renderItem={review => <Review review={review} />}
				keyExtractor={(item, index) => index.toString()}
			/> */}
			<Reviews reviews={reviews} />
		</View>
	);
}

function Review(props) {
	const { title, review, rating, createAt, avatarUser } = props.review.item;

	const dateReview = new Date(createAt.seconds * 1000);

	return (
		<View style={styles.viewReview}>
			<View style={styles.viewImageAvatar}>
				<Avatar
					size="large"
					rounded={true}
					containerStyle={styles.imageAvatarUser}
					source={{
						uri: avatarUser
							? avatarUser
							: 'https://api.adorable.io/avatars/285/as.png'
					}}
				/>
			</View>
			<View style={styles.viewInfo}>
				<Text style={styles.reviewTitle}>{title}</Text>
				<Text style={styles.reviewText}>{review}</Text>
				<Rating imageSize={15} startingValue={rating} readonly />
				<Text style={styles.reviewDate}>
					{dateReview.getDate()}/{dateReview.getMonth() + 1}/
					{dateReview.getFullYear()} - {dateReview.getHours()}:
					{dateReview.getMinutes() < 10 ? '0' : ''}
					{dateReview.getMinutes()}
				</Text>
			</View>
		</View>
	);
}

function Reviews(props) {
	const { reviews } = props;

	return (
		<View>
			{reviews.map((item, index) => {
				const dateReview = new Date(item.createAt.seconds * 1000);
				return (
					<ListItem
						key={index}
						leftAvatar={{
							source: {
								uri: item.avatarUser
									? item.avatarUser
									: 'https://api.adorable.io/avatars/285/as.png'
							}
						}}
						title={item.title}
						rightTitle={
							<Rating imageSize={15} startingValue={item.rating} readonly />
						}
						subtitle={item.review}
						rightSubtitle={
							<Text style={{ marginTop: 5, fontSize: 10, color: 'grey' }}>
								{dateReview.getDate()}/{dateReview.getMonth() + 1}/
								{dateReview.getFullYear()} - {dateReview.getHours()}:
								{dateReview.getMinutes() < 10 ? '0' : ''}
								{dateReview.getMinutes()}
							</Text>
						}
						bottomDivider
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	btnAddReview: {
		backgroundColor: 'transparent'
	},
	btnTitleAddReview: {
		color: '#00a680'
	},
	viewReview: {
		flexDirection: 'row',
		margin: 10,
		paddingBottom: 10,
		borderBottomColor: '#e3e3e3',
		borderBottomWidth: 1
	},
	viewImageAvatar: {
		marginRight: 15
	},
	imageAvatarUser: {
		width: 50,
		height: 50
	},
	viewInfo: {
		flex: 1,
		alignItems: 'flex-start'
	},
	reviewTitle: { fontWeight: 'bold' },
	reviewText: {
		paddingTop: 2,
		color: 'grey',
		marginBottom: 5
	},
	reviewDate: {
		marginTop: 5,
		color: 'grey',
		fontSize: 12,
		position: 'absolute',
		right: 0,
		bottom: 0
	}
});
