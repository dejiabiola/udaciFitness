import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo} from '../utils/helpers'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default class AddEntry extends Component {
  render() {
    return (
      <View>
        <Text>Working</Text>
        {getMetricMetaInfo('eat').getIcon()}
        <MaterialCommunityIcons name="bike" size={80} />
      </View>
    )
  }
}