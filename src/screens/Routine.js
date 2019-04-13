import React, { Component } from 'react';
import {Image, View, AsyncStorage, RefreshControl} from 'react-native';
import { Container, Header, Content, Text, Left, Body, Right, Icon, Button, Accordion, Spinner,Toast, Title } from 'native-base';

export default class Routine extends Component {
  static navigationOptions={
    drawerIcon:(
      <Image source={require('../assets/DrawerIcons/routine.png')} 
        style={{height: 24, width: 24}} />
    )
  }
  
  render() {
    return (
      <Container>
        <Header>
            <Left>
              <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                  <Icon name='menu'/>
                </Button>
            </Left>
            <Body><Title>Routine</Title></Body>
            <Right/>
        </Header>
        <Content>
          <Accordion dataArray= {routineArray} 
                    icon="add"
                    expandedIcon="remove"
                    iconStyle={{ color: "green" }}
                    expandedIconStyle={{ color: "red" }} 
                    headerStyle={{ backgroundColor: "#b7daf8" }}
                    contentStyle={{ backgroundColor: "#ddecf8" }}
          /> 
        </Content>
      </Container>
    );
  }
}

const routineArray = [
  { 
    title: "Sunday", 
    content: ` 
    Embedded System(YA) : 7:00 - 8:30
    AI(SVG) : 8:30 - 10:00
    Break : 10:00 - 10:45
    DBMS(TA) : 10:45 - 12:15
    Break : 12:15 - 1:00
    LAB DBMS / OOAD : 1:00 - 3:15` },
  { 
    title: "Monday", 
    content: ` 
    Embedded System(YA) : 7:00 - 8:30
    AI(TNA) : 8:30 - 10:00
    Break : 10:00 - 10:45
    LAB Minor / Embedded: 10:45 - 1:00
    Economics(HP) : 1:00 - 2:30` },
    { 
    title: "Tuesday", 
    content: ` 
    OS(PC) : 7:00 - 8:30
    Economics(HP) : 8:30 - 10:00
    Break : 10:00 - 10:45
    DBMS(TA): 10:45 - 12:15
    Break : 12:15 - 1:00
    LEASURE ` },
    { 
    title: "Wednesday", 
    content: ` 
    OOAD(BT) : 7:00 - 8:30
    Embedded System(AKS) : 8:30 - 10:00
    Break : 10:00 - 10:45
    AI(SVG) : 10:45 - 11:30
    OS(PC) : 11:30 - 12:15
    Break : 12:15 - 1:00
    LAB Minor / AI : 1:00 - 3:15` },
    { 
    title: "Thursday", 
    content: ` 
    OOAD(BT) : 7:00 - 8:30
    DBMS(TA) : 8:30 - 10:00
    Break : 10:00 - 10:45
    OS(PC) : 10:45 - 12:15
    Break : 12:15 - 1:00
    LAB DBMS / OS : 1:00 - 3:15` },

];