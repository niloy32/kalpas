import React from 'react';
import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {bindActionCreators} from '@reduxjs/toolkit';
import {login, loginSuccess, logout} from '../redux/Login.action';
import {connect} from 'react-redux';
import {textColor} from '../style/styles';

const CustomModal = props => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={props?.onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Name : {props.selectedData.name}
            </Text>
            <Text style={styles.modalText}>Id : {props.selectedData.id}</Text>
            <Text style={styles.modalText}>
              Email : {props.selectedData.email}
            </Text>
            <Text style={styles.modalText}>
              Phone : {props.selectedData.phone}
            </Text>
            <Text style={styles.modalText}>
              UserName : {props.selectedData.username}
            </Text>
            <Text style={styles.modalText}>
              Website : {props.selectedData.website}
            </Text>
            <Pressable
              style={{
                borderRadius: 20,
                padding: 10,
                elevation: 2,
                ...styles.buttonClose,
              }}
              onPress={props?.onPress}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
});
export default CustomModal;
