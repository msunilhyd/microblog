


(function() {

    var questions = [];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    var isSubmit = 0;

    // Display initial question
    //displayNext();

    // Build Quiz
    // buildQuiz();
    $('#next').hide();
    $('#count').hide();


    // Click handler for the 'startQuiz' button
    $('#startQuiz').on('click', function(e) {

    $("a.nav-item").off('click').on('click',function(e){

    if($('#timerCount').css('display') != 'none')
    {

          console.log('timerCount is visible');
          var b = confirm("Your test will auto-submit if you leave with still time left. Select Cancel to go back to the test.");
          if(!b){
            e.preventDefault();
            return false;
          }
          else
          {
            $('#submitQuiz').click();
          }
    }
    else
    {
        console.log('timerCount is hidden');  
    }
    });


        $('#startQuiz').hide();
        $('#submitQuiz').show();
        $('#test_instr_div').hide();

        var t = $('#time_in_mins_div').text();
        t = t * 60;

        var test_id = $('#test_id_div').text();


        getQuestions(test_id);

        function secondsToTime(secs) {
            var hours = Math.floor(secs / (60 * 60));

            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);

            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);

            var obj = {
                "h": hours,
                "m": minutes,
                "s": seconds
            };
            return hours + " hours " + minutes + " minutes " + seconds + " seconds";

        }

        function timer(count, str) {
            count--;
            if (count != 0 && count < 600) {
                str = str + "<div id='remain' style='display:block'>Last 10 minutes remaining</div>."
            } else if (count === 0) {
                clearInterval(interval);
                var scoreElem = $('<p>', {
                    id: 'timeUp'
                });
                scoreElem.append('Time up. Submitting the quiz Hey');
                quiz.append(scoreElem);
                $('#submitQuiz').click();
                var x = document.getElementById('submitQuiz');
                x.style.display = "none";
            }
            document.getElementById('timerCount').innerHTML = str;

            // body...
        }

        var interval = setInterval(function() {
            if (isSubmit === 1) {
                document.getElementById('timerCount').innerHTML = '';
                return;
            }

            timer(t, secondsToTime(t--));
        }, 1000);

        timer(t, secondsToTime(t));
        $('#submitQuiz').show();

    });


    // Creates a list of the answer choices as radio inputs
    function createRandomButtons() {
        var item = '';
        var input = '';
        for (var i = 0; i < questions.length; i++) {
            var j = i+1;
            input = '<input type="button" name="random" class="randomClass" id=random' + i +
                ' value=Q' + j + ' onclick="randomQuesFun(' + i + ')"></div>';

            item += input;
        }

        item = "Navigation for Questions <br>" + item;
        document.getElementById('ques_buttons_div').innerHTML = item;
    }


    // Click handler for the 'next' button
    $('#next').on('click', function(e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        if (questionCounter < questions.length) {
            choose();
        }
        questionCounter++;
        displayNext();

    });



    // Click handler for the 'prev' button
    $('#prev').on('click', function(e) {
        e.preventDefault();
        $('#next').show();
        if (quiz.is(':animated')) {
            return false;
        }


        if (questionCounter < questions.length) {
            choose();
        }

        questionCounter--;
        displayNext();
    });




    // Animates buttons on hover
    $('.button').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2 style="text-align:left;"> Question - ' + (index + 1) + '<span style="float:center; color:green;"> &nbsp Section : ' + questions[index].section + 
            '<span style="float:right; color:#444444; font-size: 24px;"> Sub-section : <font color="green">' + questions[index].sub_section + '<br>  &nbsp <font color="#444444"> Level : <font color="green">' + questions[index].level + '</span></h2>' );


        qElement.append(header);

        var question = $('<br><p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        if(typeof questions[index].question_image == "string")
        {
            console.log('type is string');
            console.log(questions[index].question_image);
            var img_file = '<br><img src="/static/questions/' + questions[index].question_image + '"width="auto" height="auto">'; 
            qElement.append(img_file);
        }

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li> style="height: 1.8em;"');
                  input = '<input type="radio" name="answer" class="radioClass" id=' + i + ' value=' + i + ' onclick="selectradio(event)" />';
              input += '<label for=' + i + '>' + questions[index].choices[i] + '</label>';      
            if(isSubmit === 1)
            {
              if(i == questionsAns[index].correctAnswer-1) 
              {
                input += '<span id="tick" style="color:green;"> &#10003; </span>';
              }
              else if((i != questionsAns[index].correctAnswer-1) && (i == selections[questionCounter]))
              {
                input += '<span id="cross" style="color:red;"> &#10005; </span>';
              }
              
            }

            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }



    function getQuestions(test_id) {

        test_id = test_id.replace(/ /g, '');

        $.ajax({
            url: "/test_get_questions/",
            type: "POST",
            data: {
                "test_id": test_id
            },
            success: function(data) {
                let parsedData = JSON.parse(data);
                questions = parsedData;
                displayNext();
                createRandomButtons();
            },
            error: function(data) {
                alert("Error getting questions from server");
            }
        });
    }

window.randomQuesFun  = function(i) {
    
        $('#prev').show();

        if (i < questions.length) {
            choose();
        }
        questionCounter = i;
        displayNext();               
}

window.selectradio = function (event) {

    var $radio = $(event.target) // if this was previously checked
    
    if ($radio.data('waschecked') == true) {

        console.log('radio = data waschecked');
        $radio.prop('checked', false);
        $radio.data('waschecked', false);
        document.getElementById('random' + questionCounter).style.background='none';

    } else {
        $radio.data('waschecked', true); // remove was checked from other radio
               console.log('radio = data not waschecked');
 
        document.getElementById('random' + questionCounter).style.background='lightseagreen';
    }
    // $radio.siblings('input[name="rad"]').data('waschecked', false);
    $radio.closest("ul").find('input').each(function(index, elem) {
        if (elem != event.target) {
            $(elem).data('waschecked', false);
        }
    });


}

    // Displays next requested element
window.displayNext  = function() {
        quiz.fadeOut(function() {
            $('#question').remove();
            if (questionCounter < questions.length) {
                $('#end_of_test_div').hide();
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                    $('input[value=' + selections[questionCounter] + ']').data('waschecked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                $('#next').hide();
                $('#end_of_test_div').show();

            }

          var math = MathJax.Hub.getAllJax("question");
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);

        });
    }

    // Click handler for the 'submitQuiz' button
    $('#submitQuiz').on('click', function(e) {
        $('#end_of_test_div').hide();
        isSubmit = 1;
        $('#timerCount').hide();
        $('#prev').hide();
        if (questionCounter < questions.length) {
            choose();
        }

        var test_id = $('#test_id_div').text();
        getAnswers(test_id);
    });

    var questionsAns;

    function getAnswers(test_id) {
        test_id = test_id.replace(/ /g, '');
        $.ajax({
            url: "/test_get_answers/",
            type: "POST",
            data: {
                "test_id": test_id
            },
            success: function(data) {
                let parsedData = JSON.parse(data);
                questionsAns = parsedData;
                var scoreElem = displayScore(questionsAns);
                quiz.append(scoreElem).fadeIn();
                document.getElementById('ques_buttons_div').insertAdjacentHTML('afterbegin', "You can use the below Navigations for " + 
                "checking correct answers. <br>");
            },
            error: function(data) {
                console.log("Error getting questions from server");
            }
        });
    }



    var positive_score = 0;
    var negative_score = 0;

    var no_of_correct_ans_ques = 0;
    var no_of_wrong_ans_ques = 0;
    var no_of_not_ans_ques = 0;
    var no_of_attempted_ans_ques = 0;

    // Computes score and returns a paragraph element to be displayed
    function displayScore(questionsAns) {

        $('#question').hide();
        var score = $('<p>', {
            id: 'score'
        });
        var totalMarks = $('#total_marks_div').text();

var section_total_score_map = new Map(); 
var section_positive_score_map = new Map(); 
var section_negative_score_map = new Map(); 
var section_attempted_questions_map = new Map(); 
var section_un_attempted_questions_map = new Map(); 
var section_correct_attempted_questions_map = new Map(); 
var section_wrong_attempted_questions_map = new Map(); 
  
// adding some elements to the map  
section_total_score_map.set("Maths", 0); 
section_total_score_map.set("Physics", 0);
section_total_score_map.set("Chemistry", 0);

section_positive_score_map.set("Maths", 0); 
section_positive_score_map.set("Physics", 0);
section_positive_score_map.set("Chemistry", 0);

section_negative_score_map.set("Maths", 0); 
section_negative_score_map.set("Physics", 0);
section_negative_score_map.set("Chemistry", 0);

section_attempted_questions_map.set("Maths", 0); 
section_attempted_questions_map.set("Physics", 0);
section_attempted_questions_map.set("Chemistry", 0);

section_un_attempted_questions_map.set("Maths", 0); 
section_un_attempted_questions_map.set("Physics", 0);
section_un_attempted_questions_map.set("Chemistry", 0);

section_correct_attempted_questions_map.set("Maths", 0); 
section_correct_attempted_questions_map.set("Physics", 0);
section_correct_attempted_questions_map.set("Chemistry", 0);

section_wrong_attempted_questions_map.set("Maths", 0); 
section_wrong_attempted_questions_map.set("Physics", 0);
section_wrong_attempted_questions_map.set("Chemistry", 0);

        var i = 0;
        for (i; i < selections.length; i++) {

            console.log('changing the score validations');
            console.log('[selections[i]] = ' + [selections[i]]);
            var ans = questions[i].choices;
            var userAns = selections[i];
            if (userAns === questionsAns[i].correctAnswer-1) {
                console.log('user ans is defined');
                no_of_attempted_ans_ques += 1;

                var section_score = section_total_score_map.get(questionsAns[i].section);
                section_score += questionsAns[i].positive_marks;
                section_total_score_map.set(questionsAns[i].section, section_score);

                var section_score_positive = section_positive_score_map.get(questionsAns[i].section);
                section_score_positive += questionsAns[i].positive_marks;
                section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                section_attempted_questions += 1;
                section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                var section_correct_attempted_questions = section_correct_attempted_questions_map.get(questionsAns[i].section);
                section_correct_attempted_questions += 1;
                section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions);


                positive_score += questionsAns[i].positive_marks;
                no_of_correct_ans_ques += 1;
            } else if (userAns !== undefined) {
                console.log('user ans is un defined');

                no_of_attempted_ans_ques += 1;
                var section_score = section_total_score_map.get(questionsAns[i].section);
                section_score -= questionsAns[i].negative_marks;
                section_total_score_map.set(questionsAns[i].section, section_score);
                

                var section_score_negative = section_negative_score_map.get(questionsAns[i].section);
                section_score_negative += questionsAns[i].negative_marks;
                section_negative_score_map.set(questionsAns[i].section, section_score_negative);

                var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                section_attempted_questions += 1;
                section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                var section_wrong_attempted_questions = section_wrong_attempted_questions_map.get(questionsAns[i].section);
                section_wrong_attempted_questions += 1;
                section_wrong_attempted_questions_map.set(questionsAns[i].section, section_wrong_attempted_questions);

                negative_score += questionsAns[i].negative_marks;
                no_of_wrong_ans_ques += 1;
            } else {
                console.log('user ans is not Attempted');

                var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[i].section);
                section_un_attempted_questions += 1;
                section_un_attempted_questions_map.set(questionsAns[i].section, section_un_attempted_questions);
                no_of_not_ans_ques += 1;
            }
        }

        if (i <= questionsAns.length - 1) {        
            no_of_not_ans_ques += questionsAns.length - i;

            for(var j=i;j<=questionsAns.length - 1;j++)
            {
                var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[j].section);
                section_un_attempted_questions += 1;
                section_un_attempted_questions_map.set(questionsAns[j].section, section_un_attempted_questions);
            }
        }

        var color_of_report_heading   = '<font color="lightseagreen">';
        var color_of_report_details   = '<font color="#000099">';
        var color_of_report_values   = '<font color="green">';

        var finalScore = positive_score - negative_score;
        score.append(color_of_report_heading + '&nbsp &nbsp &nbsp Report : ' + color_of_report_details + 
            ' <br> Total Questions : ' + color_of_report_values +  questionsAns.length + color_of_report_details + 
            ' <br> Questions Attempted : ' + color_of_report_values +  no_of_attempted_ans_ques + color_of_report_details + 
            ' <br> Questions Not Attempted : ' + color_of_report_values + no_of_not_ans_ques + color_of_report_details + 
            ' <br> Your Score :   ' + color_of_report_values + finalScore + ' / ' + totalMarks + color_of_report_details + 
            ' <br> Positive Marks : ' + color_of_report_values + color_of_report_values +  positive_score + color_of_report_details + 
            ' <br> Negative Marks : ' + color_of_report_values + negative_score + color_of_report_details + 
            ' <br> Answers Correct : ' + color_of_report_values + no_of_correct_ans_ques + color_of_report_details + 
            ' <br> Answers Wrong : ' + color_of_report_values + no_of_wrong_ans_ques
            );

        var x = document.getElementById('submitQuiz');
        x.style.display = "none";
        $('#next').hide();
        updateUserScore(
            finalScore, 
            positive_score, 
            negative_score,
            no_of_correct_ans_ques, 
            no_of_wrong_ans_ques, 
            no_of_not_ans_ques, 
            no_of_attempted_ans_ques,
            section_total_score_map,
            section_positive_score_map,
            section_negative_score_map,
            section_attempted_questions_map,
            section_un_attempted_questions_map,
            section_correct_attempted_questions_map,
            section_wrong_attempted_questions_map

        );
        return score;
    }


    function updateUserScore(
        finalScore, 
        positive_score, 
        negative_score,
        no_of_correct_ans_ques, 
        no_of_wrong_ans_ques, 
        no_of_not_ans_ques, 
        no_of_attempted_ans_ques,
        section_total_score_map,
        section_positive_score_map,
        section_negative_score_map,
        section_attempted_questions_map,
        section_un_attempted_questions_map,
        section_correct_attempted_questions_map,
        section_wrong_attempted_questions_map
        ) {

        var test_id = $('#test_id_div').text();
        test_id = test_id.replace(/ /g, '');
        var user_id = $('#user_id_div').text();
        user_id = user_id.replace(/ /g, '');

        $.ajax({
            url: "/test_update_user_score/",
            type: "POST",
            data: {
                "test_id": test_id,
                "user_id": user_id,
                "user_score": finalScore,
                "positive_score": positive_score,
                "negative_score": negative_score,
                "correct_answers": no_of_correct_ans_ques,
                "wrong_answers": no_of_wrong_ans_ques,
                "no_answers": no_of_not_ans_ques,
                "no_of_attempted_ans_ques": no_of_attempted_ans_ques,
                "map_total_score" : JSON.stringify(Array.from(section_total_score_map.entries())),
                "map_positive_score" : JSON.stringify(Array.from(section_positive_score_map.entries())),
                "map_negative_score" : JSON.stringify(Array.from(section_negative_score_map.entries())),
                "map_attempted" : JSON.stringify(Array.from(section_attempted_questions_map.entries())),
                "map_un_attempted" : JSON.stringify(Array.from(section_un_attempted_questions_map.entries())),
                "map_correct_attempted" : JSON.stringify(Array.from(section_correct_attempted_questions_map.entries())),
                "map_wrong_attempted" : JSON.stringify(Array.from(section_wrong_attempted_questions_map.entries()))  
            },
            success: function(data) {},
            error: function(data) {
                console.log("Error updating user score");
            }
        });
    }

})();

