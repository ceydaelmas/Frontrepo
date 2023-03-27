import React, {useContext} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
const HomeScreen = ({navigation}) => {
    return(
        <View styles={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Click Here"
>
            </Button>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
}
)