import React, { Component } from 'react';
import Questions from './questions/Questions.js';
import QuestionsNavigation from './questions/QuestionsNavigation.js';
import DisplayScore from './questions/DisplayScore.js';
import Timer from '../timer/Timer.js';
import $ from 'jQuery';

class Quiz extends Component {


	constructor(props){
		super(props);
		this.state={
			quizStarted : false,
			minutes :$('#time_in_mins_div').text(),
			timeRemainderInMin : 10,
			timesUp : false,
			testId : $('#test_id_div').text(),
			selections : [],
			questions: [],
			answers : [],
			submitted : false,
			questionCounter:0
		};
	}

	handleSelection = (selections) => {
		return this.setState(function(prevState){
			return {selections : selections}
		});
	}


	handleStartTest = (e)=>{
		e.preventDefault();
		$('#test_instr_div').hide();
		return this.setState(function(prevState){
			return {quizStarted : !prevState.quizStarted}
		});
	}

	handleTimeOut = ()=>{
		this.submitQuiz();
		return this.setState(function(prevState){
			return {timesUp : !prevState.timesUp}
		});
	}


	submitQuiz = () => {
		this.getAnswers();
		return this.setState(function(prevState){
			return {submitted : true}
		});
	}

	getAnswers = () => {
        let testId =  $('#test_id_div').text();
	    testId = testId.replace(/\s+/g, '');
        $.ajax({
            url: "/test_get_answers/",
            type: "POST",
            data: {
                "test_id": testId
            },
            success: (data) => {
                let parsedData = JSON.parse(data);
                let answers = parsedData;
                return this.setState(function(prevState){
					return {answers : answers}
				});
            },
            error: (data) => {
                console.log("Error getting answers from server");
            }
        });
    }

	componentDidMount() {
		this.setConfirmMessage();
		this.getQuestions();
	}

	setConfirmMessage(){
		/*$(window).on('beforeunload', function() {
        	$('#submitQuiz').click();
        	return 'Are you sure you want to leave?';
    	});*/
	}


	preventCutCopyPaste(){
		$(document).bind("contextmenu cut copy",function(e){
            e.preventDefault();
        });
	}


  nextHandler = () => {
    return this.setState(previousState => {
      let nextState = previousState.questionCounter+1;
      return { questionCounter: nextState}
    });
  }

  prevHandler = () => {
    return this.setState(previousState => {
      let prevState = previousState.questionCounter-1;
      return { questionCounter: prevState}
    });
  }

	getQuestions =  () => {
		let testId =  $('#test_id_div').text();
	    testId = testId.replace(/\s+/g, '');
	    $.ajax({
	        url: "/test_get_questions/",
	        type: "POST",
	        data: {
	            "test_id": testId
	        },
	        success : (data) => {
	            let parsedData = JSON.parse(data);
	            return this.setState(previousState => {
	              return { questions: parsedData }
	            });
	        },
	        error : (data) => {
	            console.log("Error getting questions from server");
	        }
	    });
  	}

  	handleQuestionNavigation=(index)=>{
  		return this.setState(previousState => {
          return { questionCounter: index}
        });
  	}
	
	render() {
		console.log(this.state);
		return (
			<div>
			{this.state.quizStarted && !this.state.submitted && <Timer minutes={this.state.minutes} timeRemainderInMin={10} handleTimeOut={this.handleTimeOut}/>}
			
			{this.state.timesUp && !this.state.submitted && 
				<p id="timeUp">Time up. Submitting the quiz.</p> }
			

			{(this.state.submitted && this.state.answers.length) ? (
				<div>
				<DisplayScore testId={this.state.testId} selections={this.state.selections} questions={this.state.questions} answers={this.state.answers}/>
				</div>
			):
			 (!this.state.quizStarted ? (

				<div class='button' id='startQuiz'><a href='#' onClick={this.handleStartTest}>Start Test</a></div>
			):
		  	
		  	(this.state.questions.length && !this.state.submitted ? (<div>
		  	<Questions nextHandler={this.nextHandler} prevHandler={this.prevHandler} testId={this.state.testId} handleSelection={this.handleSelection} questions={this.state.questions} questionCounter={this.state.questionCounter}/>
		  	<div class='submitQuiz'><a href='#' id='submitQuiz' onClick={this.submitQuiz}>Submit</a></div>
		  	<QuestionsNavigation questionCounter={this.state.questionCounter} questions={this.state.questions} handleQuestionNavigation={this.handleQuestionNavigation} selections={this.state.selections}/>
		  	</div>) : (<div></div>)
		  	))}
		  	</div>
		)
	}
}

export default Quiz;