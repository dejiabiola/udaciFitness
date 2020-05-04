import React from 'react'
import { View, Slider, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider 
        value = {value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
        style={{flex: 1}}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center', 
  },
})