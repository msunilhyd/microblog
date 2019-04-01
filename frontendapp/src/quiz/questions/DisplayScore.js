import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

class DisplayScore extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            score : null
        }
    }


    componentDidMount() {
        this.displayScore();
    }

    componentWillUnmount() {
    }

    // Computes score and returns a paragraph element to be displayed
    displayScore = () => {

        let score = {
            positive_marks_1 : parseInt($('#positive_marks_div').text()),
            negative_marks_1 : parseInt($('#positive_marks_div').text()),
            totalMarks : $('#total_marks_div').text(),
            positive_score : 0,
            negative_score : 0,
            no_of_correct_ans_ques: 0,
            no_of_wrong_ans_ques : 0,
            no_of_not_ans_ques : 0,
            no_of_attempted_ans_ques : 0,
            section_total_score_map : new Map(),
            section_positive_score_map :new Map(),
            section_negative_score_map : new Map(),
            section_attempted_questions_map : new Map(),
            section_un_attempted_questions_map : new Map(),
            section_correct_attempted_questions_map : new Map(),
            section_wrong_attempted_questions_map : new Map()
        }

        // adding some elements to the map
        score.section_total_score_map.set("Maths", 0);
        score.section_total_score_map.set("Physics", 0);
        score.section_total_score_map.set("Chemistry", 0);

        score.section_positive_score_map.set("Maths", 0);
        score.section_positive_score_map.set("Physics", 0);
        score.section_positive_score_map.set("Chemistry", 0);

        score.section_negative_score_map.set("Maths", 0);
        score.section_negative_score_map.set("Physics", 0);
        score.section_negative_score_map.set("Chemistry", 0);

        score.section_attempted_questions_map.set("Maths", 0);
        score.section_attempted_questions_map.set("Physics", 0);
        score.section_attempted_questions_map.set("Chemistry", 0);

        score.section_un_attempted_questions_map.set("Maths", 0);
        score.section_un_attempted_questions_map.set("Physics", 0);
        score.section_un_attempted_questions_map.set("Chemistry", 0);

        score.section_correct_attempted_questions_map.set("Maths", 0);
        score.section_correct_attempted_questions_map.set("Physics", 0);
        score.section_correct_attempted_questions_map.set("Chemistry", 0);

        score.section_wrong_attempted_questions_map.set("Maths", 0);
        score.section_wrong_attempted_questions_map.set("Physics", 0);
        score.section_wrong_attempted_questions_map.set("Chemistry", 0);

        let i = 0;
        let selections = this.props.selections;
        let questionsAns = this.props.answers;
        for (i; i < questionsAns.length; i++) {

            let userAns = selections[i];
            if (userAns === questionsAns[i].correctAnswer - 1) {
                score.no_of_attempted_ans_ques += 1;

                let section_score = score.section_total_score_map.get(questionsAns[i].section);
                section_score += score.positive_marks_1;
                score.section_total_score_map.set(questionsAns[i].section, section_score);

                let section_score_positive = score.section_positive_score_map.get(questionsAns[i].section);
                section_score_positive += score.positive_marks_1;
                score.section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                let section_attempted_questions = score.section_attempted_questions_map.get(questionsAns[i].section);
                section_attempted_questions += 1;
                score.section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                let section_correct_attempted_questions = score.section_correct_attempted_questions_map.get(questionsAns[i].section);
                section_correct_attempted_questions += 1;
                score.section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions);


                score.positive_score += score.positive_marks_1;
                score.no_of_correct_ans_ques += 1;
            } else if ((userAns !== undefined) && !(isNaN(userAns)) ) {

                score.no_of_attempted_ans_ques += 1;
                let section_score = score.section_total_score_map.get(questionsAns[i].section);
                section_score -= score.negative_marks_1;
                score.section_total_score_map.set(questionsAns[i].section, section_score);


                let section_score_negative = score.section_negative_score_map.get(questionsAns[i].section);
                section_score_negative += score.negative_marks_1;
                score.section_negative_score_map.set(questionsAns[i].section, section_score_negative);

                let section_attempted_questions = score.section_attempted_questions_map.get(questionsAns[i].section);
                section_attempted_questions += 1;
                score.section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                let section_wrong_attempted_questions = score.section_wrong_attempted_questions_map.get(questionsAns[i].section);
                section_wrong_attempted_questions += 1;
                score.section_wrong_attempted_questions_map.set(questionsAns[i].section, section_wrong_attempted_questions);

                score.negative_score += score.negative_marks_1;
                score.no_of_wrong_ans_ques += 1;
            } else {
                let section_un_attempted_questions = score.section_un_attempted_questions_map.get(questionsAns[i].section);
                section_un_attempted_questions += 1;
                score.section_un_attempted_questions_map.set(questionsAns[i].section, section_un_attempted_questions);
                score.no_of_not_ans_ques += 1;
            }
        }

        score.finalScore = score.positive_score - score.negative_score;
        score.timeTakenForTest = 15;
        
        this.updateUserScore(score);

        this.setState(previousState => {
            return { score: score}
        });

       

        
    }

    updateUserScore = (score) => {
         

        let test_id = this.props.testId;
        test_id = test_id.replace(/\s+/g, '');
        let user_id = $('#user_id_div').text();
        user_id = user_id.replace(/ /g, '');

        /*$.ajax({
            url: "/test_update_user_score/",
            type: "POST",
            data: {
                "test_id": test_id,
                "user_id": user_id,
                "user_score": score.finalScore,
                "positive_score": score.positive_score,
                "negative_score": score.negative_score,
                "correct_answers": score.no_of_correct_ans_ques,
                "wrong_answers": score.no_of_wrong_ans_ques,
                "no_answers": score.no_of_not_ans_ques,
                "no_of_attempted_ans_ques": no_of_attempted_ans_ques,
                "map_total_score": JSON.stringify(Array.from(score.section_total_score_map.entries())),
                "map_positive_score": JSON.stringify(Array.from(score.section_positive_score_map.entries())),
                "map_negative_score": JSON.stringify(Array.from(score.section_negative_score_map.entries())),
                "map_attempted": JSON.stringify(Array.from(score.section_attempted_questions_map.entries())),
                "map_un_attempted": JSON.stringify(Array.from(score.section_un_attempted_questions_map.entries())),
                "map_correct_attempted": JSON.stringify(Array.from(score.section_correct_attempted_questions_map.entries())),
                "map_wrong_attempted": JSON.stringify(Array.from(score.section_wrong_attempted_questions_map.entries())),
                "time_taken_test": score.timeTakenForTest
            },
            success: (data) =>  {},
            error: (data) =>  {
                console.log("Error updating user score");
            }
        });*/
    }
    

    render() {
        if(this.state.score){
            return (
                <div>
                    <div className="darkcyan"> Report : </div>
                    <div><span className="grey">Total Questions</span><span className="darkcyan">{this.props.answers.length}</span></div>
                    <div><span className="grey">Questions Attempted</span><span className="darkcyan">{this.state.score.no_of_attempted_ans_ques}</span></div>
                    <div><span className="grey">Questions Not Attempted</span><span className="darkcyan">{this.state.score.no_of_not_ans_ques}</span></div>
                    <div><span className="grey">Your Score</span><span className="darkcyan">{this.state.score.finalScore}/{this.state.score.totalMarks}</span></div>
                    <div><span className="grey">Positive Marks</span><span className="darkcyan">{this.state.score.positive_score}</span></div>
                    <div><span className="grey">Negative Marks</span><span className="darkcyan">{this.state.score.negative_score}</span></div>
                    <div><span className="grey">Answers Correct</span><span className="darkcyan">{this.state.score.no_of_correct_ans_ques}</span></div>
                    <div><span className="grey">Answers Wrong</span><span className="darkcyan">{this.state.score.no_of_wrong_ans_ques}</span></div>
                </div>
            )
        } else {
            return null;
        }
    }
}


export default DisplayScore;