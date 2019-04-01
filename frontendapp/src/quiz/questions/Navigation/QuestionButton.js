import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

class QuestionButton extends React.Component {
  

  constructor(props) {
    super(props);
  }

  handleRandomQuesFun = (event) =>{
    let index = event.target.value-1;
    this.randomQuesFun(index);
  }

  randomQuesFun = (i) =>  {
    let buttonClass = $('#random' + i).attr("class");
    $('.randomClass').removeClass("yellow");
    $('#random' + i).addClass(buttonClass + " yellow");
    this.props.handleQuestionNavigation(i);
  }

  render() {
        

    
    let questions = this.props.questions;
    let local_section = questions[0].section;
    let section = "";
    let buttons = this.props.questions.map((question,index) => {
       if(index == 0 || question.section != local_section){
          local_section = question.section;
          section = <div id="section_at_test" className="section_at_test">{question.section}</div> 
        } else {
          section="";
        }
        return(
          <li>
            {section}
            {this.props.selections[index] ? (
            <input type="button" name="random" class="randomClass lightseagreen" id={"random"+index} value={index+1} onClick={this.handleRandomQuesFun} />
            ):this.props.questionCounter == index ? (<input type="button" name="random" class="randomClass yellow" id={"random"+index} value={index+1} onClick={this.handleRandomQuesFun} />)
            :(<input type="button" name="random" class="randomClass" id={"random"+index} value={index+1} onClick={this.handleRandomQuesFun} />)
            }
          </li>
        )
      });
    return(
      <div id='ques_buttons_div'>{buttons}</div>
    )
  }
}

export default QuestionButton;



