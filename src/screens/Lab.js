import React, { Component } from 'react';
import {Image, View, StyleSheet, Linking, AsyncStorage,RefreshControl} from 'react-native';
import { Container, Header, Content, Text, Left, Body, Right, Icon, Button, Spinner, List, ListItem, Toast,Title } from 'native-base';

export default class Lab extends Component {

  static navigationOptions ={
  	drawerIcon:(
  		<Image source={require('../assets/DrawerIcons/lab.png')}
  			style={{height:24, width: 24}} />
  	)
  }

  constructor(props) {
    super(props);
  
    this.state = {
      isLoading:true,
      pullrefreshing:false,
      data:null
    };
  }
  componentDidMount(){
    this.fetchLabs(false);
  }

  fetchLabs(pulled){
    if(pulled){
      this.setState({pullrefreshing:true});
    }
    return fetch('http://jyashaa.com/killemall/JSON.php')
      .then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading: false,
          pullrefreshing:false,
          data: responseJson
        });
        AsyncStorage.setItem('cachedLab', JSON.stringify(responseJson)).done();       
      }).catch((error)=>{
        AsyncStorage.getItem("cachedLab").then((data) => {
          if(data!==null){
          var dataJson = JSON.parse(data);
          this.setState({
            isLoading:false,
            pullrefreshing:false,
            data: dataJson
          });
          }else{
            Toast.show({
              text: 'Internet is required !',
              buttonText: 'Okay'
            });
            this.setState({
              isLoading:false,
              pullrefreshing:false
            });
          }
        }).catch(err=>{
            Toast.show({
              text: 'Internet is required !',
              buttonText: 'Okay'
            });
            this.setState({
              isLoading:false,
              pullrefreshing:false
            });
        }).done();
      });
  }

  renderLabs(){
    if(this.state.isLoading){
      return (
        <View style= {styles.container}>
        <Spinner color='blue' />
        </View>
      );
    }else if(this.state.data===null){}
    else{
      let subName=[];
      let labno=[[],[]];
      let labsarr=[];
      var labObj = this.state.data.lab;
      
      for(var subjectName in labObj){
          labsarr=[];
          subName.push(subjectName);

          for(var LabNo in labObj[subjectName]){
            labsarr.push(LabNo);
          }

          labno[subjectName] = [... labsarr];
      }
      return subName.map(subject=>{
        if(labno[subject].length >0 ){
          return(
            <View key={subject}>
              <List><ListItem itemDivider><Text>{subject}</Text></ListItem></List>
              <List dataArray={labno[subject]}
              renderRow={(item) =>
                <ListItem >
                  <Left>
                    <Text>{item}</Text>
                  </Left>
                  <Right>
                    <Button transparent onPress={()=>{Linking.openURL(labObj[subject][item])}}>
                      <Icon name="download" />
                    </Button>
                  </Right>
                </ListItem>
                } >
                </List>
            </View>
          );
        }
      });
    }
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
            <Body><Title>Labs</Title></Body>
            <Right/>  
          </Header>
            <Content
              refreshControl = {
              <RefreshControl
                refreshing={this.state.pullrefreshing}
                onRefresh={this.fetchLabs.bind(this,true)}
              /> }
            >
            {this.renderLabs()}
      		</Content>
      </Container>
    );
  }
}
