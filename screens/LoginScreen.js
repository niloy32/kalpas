import {bindActionCreators} from '@reduxjs/toolkit';
import React, {useState, useEffect} from 'react';
import {
  ToastAndroid,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {login, loginFail, loginSuccess} from '../redux/Login.action';
import AuthService from '../redux/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {textColor} from '../style/styles';
import Text_input from '../components/Text_input';
import Logo from '../images/Logo.png';
const LoginScreen = props => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const [loginState, setLoginState] = useState('');
  const errorLogins = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Enter Valid Email or Password',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const loginAPi = async () => {
    if (loginCredentials.email && loginCredentials.password) {
      props.login();
    } else {
      errorLogins();
    }
  };

  const saveToLocalStorage = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@token', jsonValue);
    } catch (e) {}
  };
  const checkLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        const parseValue = JSON.parse(value);
        AuthService.login(parseValue.email, parseValue.password)
          .then(user => {
            props.loginSuccess(user);
            setLoginState('Login Successful');
            saveToLocalStorage(user);
          })
          .catch(error => {
            console.log(error);
            errorLogins();
            props.loginFail(error);
          });
      }
    } catch (e) {}
  };
  useEffect(() => {
    AuthService.login(loginCredentials.email, loginCredentials.password)
      .then(user => {
        props.loginSuccess(user);
        saveToLocalStorage(user);
      })
      .catch(error => {
        console.log('error==', error);
        errorLogins();
        props.loginFailure(error);
      });
  }, [props.loginState?.isLoggingIn]);

  useEffect(() => {
    if (props.loginState?.isLoggedIn) {
      props.navigation.navigate('Home');
    }
  }, [props.loginState?.isLoggedIn]);
  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/Logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Enter your credentials</Text>
      {/* Input Field Start */}
      <Text_input
        placeholder="Email"
        onChangeText={value => {
          setLoginCredentials({...loginCredentials, email: value});
        }}
      />
      <Text_input
        placeholder="password"
        secureTextEntry={true}
        onChangeText={value =>
          setLoginCredentials({...loginCredentials, password: value})
        }
      />
      {/* Input Field End */}
      <Button title="Login" color="#841584" onPress={loginAPi} />
    </View>
  );
};

const mapStateToProps = store => ({
  loadingState: store.loading,
  loginState: store.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: login,
      loginSuccess: loginSuccess,
      loginFailure: loginFail,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '50%',
  },
  text: {
    fontSize: 20,
    color: textColor,
    marginBottom: 20,
  },
  textInput: {
    color: textColor,
  },
  textInput_box: {
    borderBottomColor: textColor,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  image: {
    height: 100,
    width: 200,
  },
});
