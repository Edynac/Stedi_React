import {useState} from 'react';
import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import AppName from "./AppName";
import Setting from "./Setting";

function Bar(props) {
    const [userEmail, setUserEmail] = useState(props.userEmail);
    console.log('Logged In User: '+props.userEmail)
    return(
        <View style={styles.bar}>
            <AppName />
            <Text>Logged In User: {"\n"}{props.userEmail}</Text>
        </View>
    )
  }

export default Bar

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        height: '12%',
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        
      },
})