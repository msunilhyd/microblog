import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import QuestionButton from './Navigation/QuestionButton.js'

class QuestionsNavigation extends React.Component {
  

  constructor(props) {
    super(props);
  }
  render() {
  	

	return(
	<div id='ques_nav_container' name='ques_nav_container' className="ques_nav_container">
  		<div id='nav_for_questions' >
        	<h2 id='nav_for_questions'> <strong>Navigation for Questions </strong></h2>
          <h3 id='nav_for_questions'>You can use the below Navigations for checking correct answers </h3>
    	</div>
  		<QuestionButton questionCounter={this.props.questionCounter} selections={this.props.selections} questions={this.props.questions} handleQuestionNavigation={this.props.handleQuestionNavigation}/>
	</div>
	
	)


}

}

export default QuestionsNavigation;



