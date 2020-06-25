import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import UserInfoComponent from '../../components/account/UserInfoComponent';

const InfoUser = (props) => {
	return (
		<ScrollView centerContent={true} style={styles.viewBody}>
			<UserInfoComponent />

			<View style={styles.viewBtn}>
				<Button
					buttonStyle={styles.btnStyle}
					containerStyle={styles.btnContainer}
					title="Cambiar hospital"
					onPress={() => console.log('Navegar a cambiar Usuario Hospital ')}
				/>
			</View>

            <View style={styles.viewBtn}>
				<Button
					buttonStyle={styles.btnStyle2}
					containerStyle={styles.btnContainer}
					title="Convertir en dispositivo del Hospital "
					onPress={() => console.log('Navegar a hacer lider Hospital ')}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	btnStyle: {
		marginTop: 200,
		backgroundColor: '#00a680'
	},	btnStyle2: {
		marginTop: 30,
		backgroundColor: '#00a680'
	},
	btnContainer: {
		width: '70%'
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	}
});

export default InfoUser;
