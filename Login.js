import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const sendText= async (phoneNumber) => {
  console.log("PhoneNumber: ", phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers: {
      'content-type': 'application/text'
    }
  });


};

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
    const tokenResponse=await fetch('https://dev.stedi.me/twofactorlogin',{
      method: 'POST',
      body:JSON.stringify({oneTimePassword, phoneNumber}),
      headers: {
        'content-type': 'application/json'
      }
    });
  
    const responceCode = tokenResponse.status;//200 means logged in successfully
    console.log("Response Status Code", responceCode);
    if(responceCode==200){
      const token = await tokenResponse.text();
      console.log(token)
      const emailResponce = await fetch("https://dev.stedi.me/validate/"+token);
      const textEmail = await emailResponce.text();
      console.log("textEmail:"+textEmail);
      props.setUserEmail(textEmail);
      setUserLoggedIn(true);
    }
  
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholderTextColor='#4251f5'
        placeholder="801-555-1212"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='#4251f5'
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn})
      }}
      >
        <Text>Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;