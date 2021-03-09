import React, {useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  NativeModules,
  NativeEventEmitter,
  Button,
} from 'react-native';

// use fancy math native module
const FancyMathEventEmitter = new NativeEventEmitter(NativeModules.FancyMath);

// use async sample native module
const AsyncSampleEventEmitter = new NativeEventEmitter(
  NativeModules.AsyncSample,
);

export default function App() {
  const eventHandler = (result) => {
    console.log('Event was fired with:', result);
  };

  useEffect(() => {
    FancyMathEventEmitter.addListener('AddEvent', eventHandler);
    AsyncSampleEventEmitter.addListener('GetStringEvent', eventHandler);
    return () => {
      FancyMathEventEmitter.removeAllListeners();
      AsyncSampleEventEmitter.removeAllListeners();
    };
  }, []);

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'black', fontSize: 50}}>
        FancyMath says PI = {NativeModules.FancyMath.Pi}
      </Text>
      <Text style={{color: 'black', fontSize: 50}}>
        FancyMath says E = {NativeModules.FancyMath.E}
      </Text>
      <Button onPress={onPressHandler} title="Click me!" />
    </View>
  );
}
