import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { blue, white } from '../utils/colors'

class QuizResults extends Component {
  componentDidMount () {
    clearLocalNotification()
        .then(setLocalNotification)
  }
  render () {
    const { numQuestions, correct, navigation, handleRestart } = this.props
    const percentage = ((correct / numQuestions) * 100).toFixed(0)
    
    return (
      <View style={styles.container}>
        <Text style={styles.results}>{correct} / {numQuestions} correct ({percentage}%)</Text>
        <TouchableOpacity style={styles.btn} onPress={handleRestart}>
          <Text style={styles.btnText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DeckDetails')}>
          <Text style={styles.btnText}>Back to deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  results: {
    fontSize: 30,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: blue,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: white,
    fontSize: 20,
  }
})

export default QuizResults