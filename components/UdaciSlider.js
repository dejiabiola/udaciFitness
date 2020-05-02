import React from 'react'
import { View, Slider, Text } from 'react-native'

export default function UdaciSlider({ max, unit, step, value, onChange }) {
  return (
    <View>
      <Slider 
        value = {value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}