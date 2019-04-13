import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import { Container, Header, Content, Text, Left, Body, Right, Icon, Root } from 'native-base';
import codePush from "react-native-code-push";

import Home from './screens/Home';
import Routine from './screens/Routine';
import Tutorial from './screens/Tutorial';
import Lab from './screens/Lab';
import Assignment from './screens/Assignment';
import WorldCup from './screens/WorldCup';
export default class App extends Component<Props> {
  // componentDidMount(){
  //   codePush.sync({ updateDialog: true });
  // }
  render() {
    return (
      <Root>
      <DrawNavigator />
      </Root>
    );
  }
}
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog:true };
App = codePush(codePushOptions)(App);
module.exports=App;

const CustomDrawerComponent = (props)=>(
    <Container>
      <Header style={{height: 200}}>
        <Body>
          <Image
            source={require('./assets/DrawerIcons/profile.jpg')}
            style ={styles.drawerImage} />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </Container>
);

const DrawNavigator = createDrawerNavigator({
  Home:{ screen:Home},
  Routine:{screen:Routine},
  Labs:{screen:Lab},
  Assignments:{screen:Assignment},
  Tutorials:{screen:Tutorial},
  WorldCup:{screen:WorldCup},
},{
  initialRouteName:'Routine',
  contentComponent:CustomDrawerComponent
});



styles = StyleSheet.create({
  drawerImage:{
    height:150,
    width:150,
    borderRadius: 75

  }
});