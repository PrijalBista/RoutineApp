import React, { Component } from 'react';
import {Image, View, StyleSheet, Linking, AsyncStorage, RefreshControl} from 'react-native';
import { Container, Header, Content, Text, Left, Body, Right, Icon, Button, Spinner, List, ListIte0, Toast, Title, Card, CardItem} from 'native-base';

export default class WorldCup extends Component {

  static navigationOptions ={
  	drawerIcon:(
  		<Image source={require('../assets/DrawerIcons/worldcup.png')}
  			style={{height:24, width: 24}} />
  	)
  }

  constructor(props) {
    super(props);
  
    this.state = {
      isLoading:true,
      pullrefreshing:false,
      data:[],
      currentmatch:[],
      tomorrowsmatch:[]
    };
  }
  componentDidMount(){
    this.fetchTodaysMatch(false);
  }

  fetchCurrentMatch(){
    return fetch('http://worldcup.sfg.io/matches/current')
      .then(response=>response.json())
      .then(resJson=>{
        this.setState({currentmatch:resJson});
      }).catch(err=>{
          Toast.show({
            text: 'bruh! no internet :( ',
            buttonText: 'Okay'
          });
      }).done();

  }
  renderCurrentMatch(){
    if(this.state.currentmatch.length===0){
      return(
        <Card>
          <CardItem header bordered>
            <Text>Current Match</Text>
          </CardItem>
          <CardItem>
            <Body>
               <Text>No Match is running now</Text>   
            </Body>
          </CardItem>
        </Card>
      );
   }else{
      return(
        <Card>
          <CardItem header bordered>
            <Text>Current Match</Text>
          </CardItem>
          <CardItem>
            <Body>
                <Text style={{alignSelf: 'center'}}>Minutes Passed: {this.state.currentmatch[0].time}</Text>   
                <Text style={{alignSelf: 'center'}}>{this.state.currentmatch[0].home_team.country}  VS  {this.state.currentmatch[0].away_team.country}</Text>   
                <Text style={{alignSelf: 'center'}}>{this.state.currentmatch[0].home_team.goals}   -   {this.state.currentmatch[0].away_team.goals}</Text>
            </Body>
          </CardItem>
          {this.renderCurrentEvents()}
        </Card>


      );    
    }
  }

  renderCurrentEvents(){
    let cm=this.state.currentmatch; 
    let hte=this.state.currentmatch[0].home_team_events.length;
    let ate=this.state.currentmatch[0].away_team_events.length;
    if(cm!==null && cm.length!==0){
      let home_team =this.state.currentmatch[0].home_team_events.map(event=>{
        return(
          <CardItem key={event.id} bordered>
            <Body>
              <Text>{event.type_of_event} : {event.player} at {event.time} min</Text>                
            </Body>
          </CardItem>
        );
      });
      let away_team =this.state.currentmatch[0].away_team_events.map(event=>{
        return(
          <CardItem key={event.id} bordered>
            <Body>
              <Text>{event.type_of_event} : {event.player} at {event.time} min</Text>                
            </Body>
          </CardItem>
        );
      });

      return(
        <Card>
        <CardItem header bordered>
          <Text>Events : {this.state.currentmatch[0].home_team.country}</Text>
        </CardItem>
        {home_team}
        <CardItem header bordered>
          <Text>Events : {this.state.currentmatch[0].away_team.country}</Text> 
        </CardItem>
        {away_team}
        </Card>
      );
    }
  }

  fetchTodaysMatch(pulled){
    if(pulled){
    this.setState({pullrefreshing:true});
    }
    return fetch('http://worldcup.sfg.io/matches/today')
      .then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading: false,
          pullrefreshing:false,
          data: responseJson
        });
        AsyncStorage.setItem('todaysMatch', JSON.stringify(responseJson)).done();
        this.fetchCurrentMatch();
        this.fetchTomorrowsMatch();      
      }).catch((error)=>{
        AsyncStorage.getItem("todaysMatch").then((data) => {
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
              isLoading: false,
              pullrefreshing:false,
            });
          }
        }).done();
      });   
  }
  renderTodaysMatch(){
    if(this.state.isLoading){
      return (
        <View style= {styles.container}>
        <Spinner color='blue' />
        </View>
      );
    }else if(this.state.data.length===0){}
    else{
      return this.state.data.map(match=>{
        return(
          <Card key={match.fifa_id}>
            <CardItem>
              <Body>
                 <Text style={{alignSelf: 'center'}}>{match.home_team.country}  VS  {match.away_team.country}</Text>
                 <Text style={{alignSelf: 'center'}}>{match.home_team.goals}   -   {match.away_team.goals}</Text>
                 <Text style={{alignSelf: 'center'}}>{(match.winner!==null)?("Winner : "+match.winner):""}</Text>
              </Body>
            </CardItem>
          </Card>        
        );
      });
    }
  }

  fetchTomorrowsMatch(pulled){
    if(pulled){
    this.setState({pullrefreshing:true});
    }
    return fetch('http://worldcup.sfg.io/matches/tomorrow')
      .then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading: false,
          pullrefreshing:false,
          tomorrowsmatch: responseJson
        });
        AsyncStorage.setItem('tomorrowsMatch', JSON.stringify(responseJson)).done();
        this.fetchCurrentMatch();      
      }).catch((error)=>{
        AsyncStorage.getItem("tomorrowsMatch").then((data) => {
          if(data!==null){
          var dataJson = JSON.parse(data);
          this.setState({
            isLoading:false,
            pullrefreshing:false,
            tomorrowsmatch: dataJson
          });
          }else{
            Toast.show({
              text: 'Internet is required !',
              buttonText: 'Okay'
            });
            this.setState({
              isLoading: false,
              pullrefreshing:false,
            });
          }
        }).done();
      });   
  }

  renderTomorrowsMatch(){
    if(this.state.isLoading){
      return (
        <View style= {styles.container}>
        <Spinner color='blue' />
        </View>
      );
    }else if(this.state.tomorrowsmatch.length===0){}
    else{
      return this.state.tomorrowsmatch.map(match=>{
        return(
          <Card key={match.fifa_id}>
            <CardItem>
              <Body>
                 <Text style={{alignSelf: 'center'}}>{match.home_team.country}  VS  {match.away_team.country}</Text>
                 <Text style={{alignSelf: 'center'}}>{match.home_team.goals}   -   {match.away_team.goals}</Text>
              </Body>
            </CardItem>
          </Card>        
        );
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
            <Body><Title>WorldCupResults</Title></Body>
            <Right/>  
          </Header>
      		  <Content padder
              refreshControl = {
              <RefreshControl
                refreshing={this.state.pullrefreshing}
                onRefresh={this.fetchTodaysMatch.bind(this,true)}
              /> }
            >
              <Card>
                <CardItem>
                  <Body>
                    <Text>
                      WorlCup 2018 match results API. This Api is free one so updates once every minute. Pull down to refresh
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            {this.renderCurrentMatch()}
            <Card>
            <CardItem header bordered>
              <Text>Todays Matches</Text>
            </CardItem>
            {this.renderTodaysMatch()}
            </Card>  
            <Card>
            <CardItem header bordered>
              <Text>Tomorrows Matches</Text>
            </CardItem>
            {this.renderTomorrowsMatch()}
            </Card>          
      		</Content>
      </Container>
    );
  }
}
