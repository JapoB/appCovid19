import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';

const UserInfoComponent = (props) =>{
  //	const { userInfo: {uid, photoURL, displayName, email, nombreHospital }, toasRef, setLoading, setLoadingText } = props;
  let photoURL, email, nombreHospital, displayName;

    
    return (
        <View style={styles.viewUsserInfo}>
			<Avatar
				rounded
				size="large"
				containerStyle={styles.userInfoAvatar}
				source={photoURL ? { uri: photoURL } : require('../../../assets/img/hospitalRoca.jpg')}
			/>
			<View>
				<Text style={styles.displayName}>{displayName ? displayName : 'Marco Mario'}</Text>
				<Text style={styles.textData}>{email ? email : 'peppe@gmail.com'}</Text>
                <Text style={styles.textData}>{nombreHospital ? nombreHospital : 'Hospital XXX'}</Text>
			</View>
            <View style={styles.viewBtn}>
				<Button
					buttonStyle={styles.btnStyle}
					containerStyle={styles.btnContainer}
					title="Ver tu perfil"
					onPress={() => console.log("Navegar a perfil de usuario ")}
				/>
			</View>
		</View>
    )
}

const styles = StyleSheet.create({
    viewUsserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
userInfoAvatar: {
    marginRight: 20
},
displayName: {
    fontWeight: 'bold',
    paddingBottom: 5
},
textData:{
   
},
btnStyle: {
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

export default UserInfoComponent;