import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import Question from './Question.js'

class Questions extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      selections : []
     };
  }


  


  componentDidMount() {
    
  }

  componentWillUnmount() {
  }


  nextHandler = (e) => {
    e.preventDefault();
    this.props.nextHandler();
  }

  prevHandler = (e) => {
    e.preventDefault();
    this.props.prevHandler();
  }

  handleSelection = (questionCounter,value) => {
    let selectionArray = [...this.state.selections];
    selectionArray[questionCounter]=value;
    this.props.handleSelection(selectionArray);
    this.setState(previousState => {
      return { selections: selectionArray}
    });

  }

  render() {
    console.log(this.props.questionCounter);
    let questions = this.props.questions;
    if(questions.length < 1){
      return (<div><Question questionCounter={this.props.questionCounter} question={{}}/></div>)
    } else {
      return (
        <div>
          {questions.length ==  this.props.questionCounter && questions.length? 
            (
              <div id='end_of_test_div' className='end_of_test_div' >Reached End of Test.</div>
            ) :
            (
              <Question handleSelection={this.handleSelection} questionCounter={this.props.questionCounter}  question={questions[this.props.questionCounter]} selected={this.state.selections[this.props.questionCounter]} />
            )
          }

          {this.props.questionCounter < questions.length && this.props.questionCounter > 0 && <div className='prev_next' id='prev'><a href='#' onClick={this.prevHandler}>Prev</a></div>}
          {this.props.questionCounter < questions.length && questions.length > 1 &&  this.props.questionCounter != questions.length-1 && <div className='prev_next' id='next'><a href='#' onClick={this.nextHandler}>Next</a></div>}
        
        </div>
      );
    }
  }
}
export default Questions;
