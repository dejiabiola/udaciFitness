import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'
import UdaciStepper from './UdaciStepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'


function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((currState) => {
      const count = currState[metric] + step
      return {
        ...this.state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric)
    this.setState((currState) => {
      const count = currState[metric] - step
      return {
        ...this.state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }))

    // TODO: update redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))
    // todo: navigate to home
    submitEntry({ entry, key })
    // todo: clear the local notification 
  }

  reset = () => {
    const key = timeToString()
    // Todo update redux, route to home
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='md-happy' size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={new Date().toDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
              ? <UdaciSlider 
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
              : <UdaciStepper 
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              }
            </View>
          )
        })}
        <SubmitButton onPress={this.submit}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && state[key].today === undefined
  }
}

export default connect(mapStateToProps)(AddEntry)