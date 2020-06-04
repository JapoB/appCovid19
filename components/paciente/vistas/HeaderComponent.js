import React from "react";
import {
  StyleSheet,
} from "react-native";
import { Header, Button, Icon, Left, Body, Title } from 'native-base';

const HeaderComponent = (props) => {

  function handleBack(){
    props.navigation.navigate(props.ruta)
  }


    return (
        <Header>
        <Left>
          <Button transparent
            onPress={() => handleBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
        <Title>{props.title}</Title>
         <Title>{props.subTitle}</Title>
        </Body>
      </Header>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%'
      },
      button: {
        marginTop: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });

export default HeaderComponent;