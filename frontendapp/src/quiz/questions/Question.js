import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';
import CreateChoices from './CreateChoices.js'
import MathJax from 'mathjax'

class Question extends React.Component {
  

  constructor(props){
    super(props);
  }
 

  componentDidMount() {
   
     /*let math = MathJax.Hub.getAllJax("question"+this.props.questionCounter);
     MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);*/
    

  }

  render() {
        
    let  img_file = "";

    if (typeof this.props.question.question_image == "string") {
      let src = "/static/questions/"+this.props.question.question_image;
      img_file  = <img src={src} />;
    }

    return (
        <div>
          <div id={"question"+this.props.questionCounter}>
            <h2>Question - {this.props.questionCounter + 1} <span className="section">Section : {this.props.question.section}</span></h2>
            <p>{this.props.question.question}</p>
            <CreateChoices handleSelection= {this.props.handleSelection} questionCounter = {this.props.questionCounter} choices={this.props.question.choices} selected={this.props.selected}/>
           {img_file}
          </div>
        </div>
    );
  }

}


Question.propTypes = {
  question: React.PropTypes.object.isRequired
};


export default Question;
