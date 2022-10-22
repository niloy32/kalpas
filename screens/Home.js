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
import {textColor} from '../style/styles';
import CustomModal from '../components/Modal';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = props => {
  const [data, setData] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(undefined);
  const [unmutilated, setUnmutilated] = useState(undefined);

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
      const temp = json.sort(function (a, b) {
        return a.name[0] > b.name[0] ? 1 : -1;
      });
      console.log(temp);
      setData(temp);
      setUnmutilated(temp);
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

  const filter = value => {
    console.log(value);
    var re = new RegExp(value + '.+$', 'i');
    const temp = unmutilated.filter(function (e, i, a) {
      return e.name.search(re) != -1;
    });
    console.log(temp);
    setData(temp);
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Human Resources</Text>
        <View style={styles.button}>
          <Button title="Logout" color="#5e0d24" onPress={logOutApi} />
        </View>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search by name..."
          placeholderTextColor={'white'}
          style={styles.searchText}
          onChangeText={filter}
        />
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
        ListFooterComponent={() => <View style={{marginBottom: 100}}></View>}
      />
      {selectedData && (
        <CustomModal
          selectedData={selectedData}
          modalVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          onPress={() => setModalVisible(!modalVisible)}
        />
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
    color: textColor,
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
    color: textColor,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    color: textColor,
    fontWeight: '500',
  },
  email: {
    color: textColor,
    fontSize: 13,
  },
  viewButton: {
    color: textColor,
    marginLeft: 30,
  },
  button: {
    alignSelf: 'center',
    color: textColor,
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
    color: textColor,
    textAlign: 'center',
  },
  search: {
    backgroundColor: '#c8cbcf',
    borderRadius: 20,
    marginVertical: 15,
    fontSize: 12,
  },
  searchText: {
    fontSize: 18,
    paddingLeft: 10,
    color: 'white',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
