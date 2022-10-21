import {bindActionCreators} from '@reduxjs/toolkit';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {login, loginFail, loginSuccess} from '../redux/Login.action';
import store from '../redux/store';
import AppState from '../redux/AppState';
import AuthService from '../redux/AuthService';
const LoginScreen = props => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const loginAPi = async () => {
    console.log(props);
    props.login();
  };

  const [loginState, setLoginState] = useState('');
  useEffect(() => {
    AuthService.login(loginCredentials.email, loginCredentials.password)
      .then(user => {
        console.log('promise?', user);
        props.loginSuccess(user);
        setLoginState('Login Successful');
      })
      .catch(e => {
        setLoginState('invalid email or password');
      });
  }, [props.loginState?.isLoggingIn]);

  useEffect(() => {
    console.log('props after click', props);
    if (props.loginState?.isLoggedIn) {
      console.log('successfully logged in');
      props.navigation.navigate('Home');
    }
  }, [props.loginState?.isLoggedIn]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Email and pass</Text>
      {/* Input Field Start */}
      <TextInput
        placeholder="Email"
        onChangeText={value =>
          setLoginCredentials({...loginCredentials, email: value})
        }
      />
      <TextInput
        placeholder="password"
        onChangeText={value =>
          setLoginCredentials({...loginCredentials, password: value})
        }
        textContentType="password"
        secureTextEntry={true}
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
  },
});
