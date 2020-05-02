import React, { Component } from 'react';
import { StyleSheet, 
  Text, 
  View,
} from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{marginTop: '10%'}}>
          <AddEntry />
        </View> 
      </Provider> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10, 
    marginRight: 10, 
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText: {
    color: '#fff'
  }
})


