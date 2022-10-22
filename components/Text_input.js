import React from 'react';
import {
  ToastAndroid,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
} from 'react-native';
import {textColor} from '../style/styles';

export default function Text_input(props) {
  return (
    <View style={styles.textInput_box}>
      <TextInput
        placeholder={props.placeholder || ''}
        secureTextEntry={props.secureTextEntry}
        onChangeText={value => {
          if (props.onChangeText) {
            props.onChangeText(value);
          }
        }}
        style={styles.textInput}
        placeholderTextColor={textColor}
      />
    </View>
  );
}

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
  },
  textInput: {
    color: textColor,
    textAlign: 'center',
  },
  textInput_box: {
    borderBottomColor: textColor,
    borderWidth: 1,
    marginBottom: 10,
    width: 150,
    borderRadius: 100,
  },
});
