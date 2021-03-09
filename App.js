import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Button,
  TextInput,
} from 'react-native';

// use fancy math native module
const FancyMathEventEmitter = new NativeEventEmitter(NativeModules.FancyMath);

// use async sample native module
const AsyncSampleEventEmitter = new NativeEventEmitter(
  NativeModules.AsyncSample,
);

export default function App() {
  // states
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');
  const [result, setResult] = useState('');

  // this the event handler
  const eventHandler = (result) => {
    console.log('Event was fired with:', result);
  };

  // on component did mount
  useEffect(() => {
    FancyMathEventEmitter.addListener('AddEvent', eventHandler);
    AsyncSampleEventEmitter.addListener('GetStringEvent', eventHandler);
    return () => {
      FancyMathEventEmitter.removeAllListeners();
      AsyncSampleEventEmitter.removeAllListeners();
    };
  }, []);

  // this is Click me! but on press handler
  const onPressHandler = () => {
    NativeModules.FancyMath.add(
      NativeModules.FancyMath.Pi,
      NativeModules.FancyMath.E,
      function (result) {
        Alert.alert(
          'FancyMath',
          `FancyMath says ${NativeModules.FancyMath.Pi} + ${NativeModules.FancyMath.E} = ${result}`,
          [{text: 'OK'}],
          {cancelable: false},
        );
      },
    );
  };

  // this effect is used whenever the textinputs are changed
  useEffect(() => {
    addTwoNumbers();
  }, [numberOne, numberTwo]);

  // this function add two numbers and returns the result as a string
  const addTwoNumbers = () => {
    // check if inputs are empty to exit the function
    if (numberOne === '' || numberTwo === '') {
      setResult('');
      return;
    }
    // native add operation
    NativeModules.FancyMath.add(
      parseFloat(numberOne),
      parseFloat(numberTwo),
      function (result) {
        setResult(result.toString());
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: 'black', fontSize: 50}}>
          FancyMath says PI = {NativeModules.FancyMath.Pi}
        </Text>
        <Text style={{color: 'black', fontSize: 50}}>
          FancyMath says E = {NativeModules.FancyMath.E}
        </Text>
        <Button onPress={onPressHandler} title="Click me!" />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput
          style={{
            width: '20%',
            height: '20%',
            fontSize: 30,
            borderRadius: 30,
          }}
          placeholder={'Number one'}
          onChangeText={(text) => {
            setNumberOne(text);
          }}
        />
        <Text style={{color: 'black', fontSize: 50}}>+</Text>
        <TextInput
          style={{
            width: '20%',
            height: '20%',
            fontSize: 30,
            borderRadius: 30,
          }}
          placeholder={'Number two'}
          onChangeText={(text) => {
            setNumberTwo(text);
          }}
        />
        <Text style={{color: 'black', fontSize: 50}}>= {result}</Text>
      </View>
    </View>
  );
}
