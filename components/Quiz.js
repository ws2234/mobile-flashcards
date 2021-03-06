import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import CardDetails from './CardDetails'
import QuizResults from './QuizResults'
import ErrorMessage from './ErrorMessage'

class Quiz extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    numQuestions: this.props.deck.questions.length,
    currentQuestion: 0,
    showAnswer: false,
  }
  handleAnswer = (answer) => {
    this.setState((prevState) => ({
      [answer]: prevState[answer] + 1,
      currentQuestion: prevState.currentQuestion + 1,
      showAnswer: false,
    }))
  }
  handleShowAnswer = () => {
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer
    }))
  }
  handleRestart = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
      numQuestions: this.props.deck.questions.length,
      currentQuestion: 0,
      showAnsewr: false,
    })
  }
  render () {
    const { deck, navigation } = this.props
    const { questions } = deck
    const { correct, incorrect, numQuestions, currentQuestion, showAnswer } = this.state

    if (questions.length === 0) {
      return (
        <ErrorMessage />
      )
    }

    if (numQuestions === currentQuestion) {
      return (
        <QuizResults 
          numQuestions={numQuestions}
          correct={correct}
          navigation={navigation}
          handleRestart={this.handleRestart}
        />
      )
    }

    return (
      <View>
        <CardDetails 
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          questions={questions}
          handleShowAnswer={this.handleShowAnswer}
          handleAnswer={this.handleAnswer}
          showAnswer={showAnswer}
        />
      </View>
    )
  }  
}

function mapStateToProps ({ decks }, { route }) {
  const { title } = route.params
  const deck = decks[title]

  return {
    deck
  }
}

export default connect(mapStateToProps)(Quiz)