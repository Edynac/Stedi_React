import {useState} from 'react';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';

const Home = (props) => {
  const [userEmail, setUserEmail] = useState(props.userEmail);
  console.log('Home user Email: '+props.userEmail)
  return (
    <View>
      <Bar userEmail= {props.loggedInUser}/>
      <Icons /> 
    </View>
  );
};

export default Home;
