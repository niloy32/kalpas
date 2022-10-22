import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Text,
  Button,
  View,
  Modal,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {bindActionCreators} from '@reduxjs/toolkit';
import {login, loginSuccess, logout} from '../redux/Login.action';
import {connect} from 'react-redux';
import AuthService from '../redux/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const [data, setData] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(undefined);

  const logOutApi = async () => {
    // console.log(props);
    // props.logout();
    await AsyncStorage.removeItem('@token');

    AuthService.logOut()
      .then(user => {
        props.logout({});
        props.navigation.navigate('Login');
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  const getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMoviesFromApiAsync();
  }, []);
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@test_value', jsonValue);
      setSelectedData(value);
    } catch (e) {
      console.log('error saving value', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        console.log('token saved==', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Human Resources</Text>
        <View style={styles.button}>
          <Button title="Logout" color="#5e0d24" onPress={logOutApi} />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              source={{uri: 'https://reactjs.org/logo-og.png'}}
              style={styles.thumbnail}
            />
            <View style={{flex: 1}}>
              <Text style={styles.name}>Name: {item.name}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
            </View>
            <View style={styles.viewButton}>
              <Button
                title="View"
                color="#4270d4"
                onPress={() => {
                  setModalVisible(true);
                  storeData(item);
                }}
              />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View style={{marginBottom: 55}}></View>}
      />

      {selectedData && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name : {selectedData.name}</Text>
              <Text style={styles.modalText}>Id : {selectedData.id}</Text>
              <Text style={styles.modalText}>Email : {selectedData.email}</Text>
              <Text style={styles.modalText}>Phone : {selectedData.phone}</Text>
              <Text style={styles.modalText}>
                UserName : {selectedData.username}
              </Text>
              <Text style={styles.modalText}>
                Website : {selectedData.website}
              </Text>

              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  ...styles.buttonClose,
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const mapStateToProps = store => ({
  loadingState: store.loading,
  loginState: store.login,
  loginSuccess: loginSuccess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: login,
      logout: logout,
      loginSuccess: loginSuccess,
    },
    dispatch,
  );

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: '5%',
    marginHorizontal: '3%',
  },
  text: {
    fontSize: 20,
    marginVertical: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  email: {
    fontSize: 13,
  },
  viewButton: {
    marginLeft: 30,
  },
  button: {
    alignSelf: 'center',
    marginLeft: '30%',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
