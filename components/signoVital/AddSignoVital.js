import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon, Left, Button, Right, Body, Title, View } from 'native-base';
import * as Font from 'expo-font'

export default function AddSignoVital(props) {

  const [selected2, setSelected2] = useState(undefined)
  const [fontLoaded, setFontLoaded] = useState(false)
 
  useEffect(() => {
    if (!fontLoaded) {
      loadFonts();
    }
  })

  const loadFonts = async () =>{
    await Font.loadAsync({
        'Roboto_medium': require('../../node_modules/native-base/Fonts/Roboto_medium.ttf')

      })
      setFontLoaded(true)
  }

  if (!fontLoaded) {
    return(<View/>)
  }

  
   
  const onValueChange2 = (value)=>{
    setSelected2(value);
  }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
              onPress={()=> props.navigation.navigate('Home')}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
             
                style={{ width: '100%' }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selected2}
                onValueChange={onValueChange2.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  
}

