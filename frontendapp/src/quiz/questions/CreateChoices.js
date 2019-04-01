import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

class CreateChoices extends React.Component {
  

  constructor(props) {
    super(props);
    this.selectChoice = this.selectChoice.bind(this);
  }

  selectChoice = (event) => {
    var $radio = $(event.target) // if this was previously checked
    if ($radio.data('waschecked') == true) {
      $radio.prop('checked', false);
      $radio.data('waschecked', false);
      this.props.handleSelection(this.props.questionCounter,undefined);
    } else {
        $radio.data('waschecked', true); // remove was checked from other radio
        this.props.handleSelection(this.props.questionCounter,$radio.val());
    }
    $radio.closest("ul").find('input').each(function(index, elem) {
        if (elem != event.target) {
            $(elem).data('waschecked', false);
        }
    });
  }

    render() {
      let choices = this.props.choices.map((choice,index) => {
      let id = this.props.questionCounter +"" + index;
      let selected = this.props.selected ? true : false;
      return (<li key={index}>
        {this.props.selected && index == this.props.selected ? 
        <input type="radio" name="answer" checked="true" wasChecked="true" className="radioclass" id={id} value={index} onClick={this.selectChoice} />
        :<input type="radio" name="answer" wasChecked="false" className="radioclass" id={id} value={index} onClick={this.selectChoice} />
        }

        {choice.endsWith(".png") ? (
          <label for={id}><img alt="choice" src={"/static/questions/" + this.props.choice}/></label>
        ):(
           <label for={id}>{choice}</label>
        )}
     </li>)
     });
    return (
        <div>
          <ul>
            {choices}
          </ul>
        </div>
    );
  }
}


export default CreateChoices;
