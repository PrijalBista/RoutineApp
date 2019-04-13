import React, { Component } from 'react';
import {Image, View, RefreshControl} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Toast, Spinner,Title, Subtitle } from 'native-base';
import codePush from "react-native-code-push";

export default class Home extends Component {

  static navigationOptions ={
  	drawerIcon:(
  		<Image source={require('../assets/DrawerIcons/home.png')}
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
    this.fetchNasaData(false);
  }

  fetchNasaData(pulled){
    if(pulled){
      this.setState({pullrefreshing:true});
    }
    fetch("https://api.nasa.gov/planetary/apod?api_key=lYZ16uc55Eq53nJjp2E64kyXaQPgyCh1OeczLoMC")
    .then(res=>res.json())
    .then(resJson=>{
      this.setState({
          isLoading:false,
          pullrefreshing:false,
          data:resJson
      });
    })
    .catch(err=>{
      Toast.show({
        text: 'Internet is required !',
        buttonText: 'Okay'
      });
      this.setState({
        isLoading:false,
        pullrefreshing:false,
        });
    }).done();
  }
  renderFact(){
    if(this.state.isLoading){
      return (
        <View style= {styles.container}>
        <Spinner color='blue' />
        </View>
      );
    }else if(this.state.data===null){
      return;
    }else{ 
      return(
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.state.data.url}} />
                <Body>
                  <Text>{this.state.data.title}</Text>
                  <Text note>{this.state.data.date}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri:this.state.data.url}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  {this.state.data.explanation}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>CopyRight: {this.state.data.copyright || "Nasa public domain" }</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

      );

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
            <Body>
            <Title>NASA</Title>
            <Subtitle>Picture Of the Day</Subtitle>
            </Body>
            <Right/>
      		</Header>
          <Content padder
              refreshControl = {
              <RefreshControl
                refreshing={this.state.pullrefreshing}
                onRefresh={this.fetchNasaData.bind(this,true)}
              /> }
            >
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    Nasa's Astronomy Picture Of The Day (APOD) API .
                    Intersting Pictures and Info everyDay
                  </Text>
                </Body>
              </CardItem>
            </Card>
            {this.renderFact()}
          </Content>
      </Container>
    );
  }
}