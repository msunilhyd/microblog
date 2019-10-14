(function() {


    if(user_selections)
    {
        console.log('user_selections is not null = ' + user_selections);
    }
    else
    {
        console.log('user_selections is null');
    }
        // user_selections = user_selections.replace(/[[\]]/g,'')
        // user_selections = user_selections.split(',');
            // user_selections = JSON.stringify(user_selections);
            // user_selections = JSON.parse(user_selections);
            // console.log('ques_type is 2');
            // console.log('user_selections is : ' + typeof(new Array(user_selections)));
            // user_selections = new Array(user_selections);
            // console.log(user_selections[0]);
            // console.log(user_selections[1]);
            // console.log('type of user_selections is : ' + user_selections);


            // var sample_arr = [['None', 'None', 2, 3], 'None', ['None', 1, 2, 3], 'None', [0, 1, 'None', 'None'], 'None', 'None', 'None', 'None', ['None', 1, 'None', 'None']];

            // console.log(sample_arr[0]);
            // console.log(sample_arr[1]);
            // console.log(sample_arr[2]);

            // console.log('typeof sample_arr is : ' +  typeof(sample_arr));


    var isSubmit = 1;
        var x = document.getElementById('submitQuiz');
        x.style.display = "none";

    // $(window).on('beforeunload', function() {
    //     $('#submitQuiz').click();
    //     return 'Are you sure you want to leave?';
    // });

    var questions = [];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    //displayNext();

    // Build Quiz
    // buildQuiz();
    $('#next').hide();
    $('#prev').hide();
    $('#count').hide();


    // Click handler for the 'checkQuiz' button
    $('#checkQuiz').on('click', function(e) {
                $('#ques_nav_container').show();

                $('#test-title').hide();

jQuery(document).bind("contextmenu cut copy",function(e){
    e.preventDefault();
});
        // $("a.nav-item").off('click').on('click', function(e) {

        //     if ($('#timerCount').css('display') != 'none') {
        //         var b = confirm("Your test will auto-submit if you leave with still time left. Select Cancel to go back to the test.");
        //         if (!b) {
        //             e.preventDefault();
        //             return false;
        //         } else {
        //             $('#submitQuiz').click();
        //         }
        //     } else {
        //         console.log('timerCount is hidden');
        //     }
        // });

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
        var yyy = document.getElementById('random' + questionCounter).getAttribute("class");

            $('.randomClass').removeClass("yellow");

            document.getElementById('random' + questionCounter).setAttribute("class",yyy + " yellow");

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
        var yyy = document.getElementById('random' + questionCounter).getAttribute("class");

            $('.randomClass').removeClass("yellow");

            document.getElementById('random' + questionCounter).setAttribute("class",yyy + " yellow");
    });
        $('#checkQuiz').hide();
        // $('#submitQuiz').show();
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
    });


    // Creates a list of the answer choices as radio inputs
    function createRandomButtons() {
        var item = '';
        var input = '';

        var local_section = questions[0].section;
        item += '<div class="row">';
        for (var i = 0; i < questions.length; i++) {
            if (i == 0)
            {
                item +=  '<div class="col-sm-4"><div id="section_at_test">' + questions[i].section + '</div> ';
            }
            if(questions[i].section !== local_section)
            {
                item +=  '</div><div class="col-sm-4"><div id="section_at_test">' + questions[i].section + '</div> ';
                local_section = questions[i].section;
            }

            var j = i + 1;

            input = '<input type="button" name="random" class="randomClass" id=random' + i +
                ' value=' + j + ' onclick="randomQuesFun(' + i + ')">';

            item += input;
        }
        item += '<div/><div/>';
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
        var yyy = document.getElementById('random' + questionCounter).getAttribute("class");

            $('.randomClass').removeClass("yellow");

            document.getElementById('random' + questionCounter).setAttribute("class",yyy + " yellow");
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
        var yyy = document.getElementById('random' + questionCounter).getAttribute("class");

            $('.randomClass').removeClass("yellow");

            document.getElementById('random' + questionCounter).setAttribute("class",yyy + " yellow");
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

        var ques_type_for_test = "";
        var ques_type = questions[index].type;
        // console.log('ques_type is : ' + ques_type);
        if(ques_type === 1)
        {
            ques_type_for_test = "Single Correct Answer ";
        }
        else if(ques_type === 2)
        {
            ques_type_for_test = "Multiple Correct Answers ";
        }
        else if(ques_type === 3)
        {
            ques_type_for_test = "Numerical Answer ";
        }


        // console.log('ques_type is : ' +  ques_type);
        var header = $('<div class="combined_div"><div class="type_div">' + ques_type_for_test  + '</div>  '+
            '<div class="section_type_div"> <strong style="color:black;">' + (index + 1) +'.</strong> '+  questions[index].section  + '</div></div><br>');


        qElement.append(header);

        var question = $('<p class="question_element">').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        //console.log('radioButtons is : ' + radioButtons);
        qElement
        qElement.append(radioButtons);

        if (typeof questions[index].question_image == "string") {
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
        var type_of_question = questions[index].type;
        item = $('<li> style="height: 1.8em;"');


        if(type_of_question != 3)
        {

                for (var i = 0; i < questions[index].choices.length; i++) {

                    if(type_of_question == 1)
                    {
                        input = '<br><input type="radio" name="answer" class="radioClass" id=' + i + ' value=' + i + ' onclick="selectradio(event)" />';
                    }
                    else if(type_of_question == 2)
                    {
                        input = '<br><input type="radio" name="answer' + i + '" + class="radioClass" id=' + i + ' value=' + i + ' onclick="selectradio(event)" />';
                    }

                    var str = questions[index].choices[i];
                    var n = str.endsWith(".png");

                    if (n === true) {
                        var img_file = '<br><img src="/static/questions/' + questions[index].choices[i] + '"width="auto" height="auto">';
                        input += '<label for=' + i + '>' + img_file + '</label>';
                    } else {
                        input += '<label for=' + i + '>' + questions[index].choices[i] + '</label>';
                    }

                    if (isSubmit === 1) {
                        if(type_of_question == 1)
                        {
                            // console.log('user_selections is : ' + user_selections);
                            // console.log('user_selections[questionCounter] is : ' + user_selections[questionCounter]);

                            input = "";
                            if(i == 0)
                            {
                                input = "<br>";
                            }
                            if (i == questionsAns[index].correctAnswer - 1 && i != user_selections[questionCounter]){
                                input += '<span id="tick" style="color:green;"> &#10003; </span>';
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                            } else if ((i != questionsAns[index].correctAnswer - 1) &&
                                (i == user_selections[questionCounter])) {
                                input += '<span id="tick" style="color:red;visibility:hidden"> &#10003; </span>';
                                input += '<span id="cross" style="color:red;"> &#10005; </span>';
                            }
                            else if((i == questionsAns[index].correctAnswer - 1) && (i == user_selections[questionCounter]))
                            {
                                input += '<span id="tick" style="color:green;"> &#10003; </span>';
                                input += '<span id="tick" style="color:red;"> &#10003; </span>';
                            }
                            else{
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                            }


                            // input += '<br><input type="radio" name="answer" class="radioClass" id=' + i + ' value=' + i + ' onclick="selectradio(event)" />';
                            var str = questions[index].choices[i];

                            input += '<label for=' + i + '>' + questions[index].choices[i] + '</label><br>';

                        }
                        else if(type_of_question == 2)
                        {

                                console.log('user_selections[questionCounter] is : ' + user_selections[questionCounter]);

                            // user_selections_ans[index];
                            var ans_list = questionsAns[index].correctAnswer;

                            console.log('ans_list is : ' + ans_list);
                            // console.log('selections[questionCounter] is : ' + selections[questionCounter]);
                            input = "";
                            if(i == 0)
                            {
                                input += "<br>";
                            }
                            console.log(ans_list)
                            console.log('index of i+1 in ans_list is : ' + ans_list.indexOf(i+1));
                            if(ans_list != null && ans_list.indexOf(i+1) > -1 )
                            {
                                console.log(1);
                                input += '<span id="tick" style="color:green;"> &#10003; </span>';
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                            }
                            else if( user_selections[questionCounter] != null && (user_selections[questionCounter].indexOf(i) > -1)
                                && ans_list != null && ans_list.indexOf(i+1) > -1)
                            {
                                console.log(2);
                                input += '<span id="tick" style="color:green;"> &#10003; </span>';
                                input += '<span id="tick" style="color:red;"> &#10003; </span>';
                            }
                            else if(user_selections[questionCounter] != null &&  (user_selections[questionCounter].indexOf(i) > -1)
                                && ans_list != null && ans_list.indexOf(i+1) == -1)
                            {
                                console.log(3);
                                 input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                                input += '<span id="cross" style="color:red;"> &#10005; </span>';
                            }else{
                                    console.log(4);
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                                input += '<span id="tick" style="color:green;visibility:hidden"> &#10003; </span>';
                            }

                            input += '<input type="radio" name="answer' + i + '" + class="radioClass" id=' + i + ' value=' + i + ' onclick="selectradio(event)" />';
                            input += '<label for=' + i + '>' + questions[index].choices[i] + '</label><br>';
                        }
                    }

                    item.append(input);
                    radioList.append(item);
            }
        }
        else
        {
            // debugger;
            // console.log(typeof isSubmit);
            if(isSubmit == 1 || isSubmit == "1")
            {
                // console.log('isSubmit = 1');
                // console.log('index is : ' + index);
                // console.log('selections is : ' + selections);

                    var userAns = user_selections[index];
                    input = $('<input/>');
                    input.attr("type","text");
                    input.attr("name", "int_answer");
                    input.attr("id", "int_ans_correct" + index);
                    input.attr("class", "radioClass");

                    input.val(questionsAns[index].correctAnswer);
                    item.append(input);
                    item.append('<span id="tick" style="color:green;"> &#10003; </span>');

                    radioList.append(item);

                    var userAns = user_selections[index];

                if(userAns !== undefined && userAns !=="" && userAns !=="None")
                {
                    var input2 = $('<input/>');
                    var item2 = $('<li> style="height: 1.8em;"');

                    input2.attr("type","text");
                    input2.attr("name", "answer");
                    input2.attr("id", "int_answer" + index);
                    input2.attr("class", "radioClass");
                    input2.val(userAns);

                    item2.append(input2);;

                    if(Math.round(userAns) == questionsAns[index].correctAnswer)
                    {
                        item2.append('<span id="tick" style="color:red;"> &#10003; </span>');
                    }
                    else
                    {
                        item2.append('<span id="cross" style="color:red;"> &#10005; </span>');
                    }
                    radioList.append(item2);
            }
            }
            else
            {

                // console.log('isSubmit != 1');
                    input = $('<input/>');
                    input.attr("type","text");
                    input.attr("name", "answer");
                    input.attr("id", "int_ans_init" + index);
                    input.attr("class", "radioClass");

                    if(selections[questionCounter])
                    {
                        input.attr("value", selections[questionCounter]);
                    }

                    item.html(input);
                    radioList.append(item);
            }
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();



        //console.log('printing answer as below');
        //console.log(+$('input[name="answer"]').val());

        var ques_type = questions[questionCounter].type;
        //console.log('ques_type is: ');
        //console.log(ques_type);
        if(ques_type == 2){
            var list_of_ans = [];
            list_of_ans.push(+$('input[name="answer0"]:checked').val());
            list_of_ans.push(+$('input[name="answer1"]:checked').val());
            list_of_ans.push(+$('input[name="answer2"]:checked').val());
            list_of_ans.push(+$('input[name="answer3"]:checked').val());
            // console.log(list_of_ans);
            selections[questionCounter] = list_of_ans;

            //selections[questionCounter].push(+$('input[name="answer0"]:checked').val());
            // console.log('selections is as below : ');
            // console.log(selections);
        }
        if(ques_type == 3){
            // console.log('ques_type == 3 and userAns is : ' + $('input[name="answer"]').val())
            selections[questionCounter] = $('input[name="answer"]').val();
            // console.log(selections[questionCounter]);
            if(selections[questionCounter])
            {
                // console.log(questionCounter);
                // console.log(selections[questionCounter]);
                document.getElementById('random' + questionCounter).setAttribute("class", document.getElementById('random' + questionCounter).getAttribute("class")+" lightseagreen");
            }
            else
            {
                document.getElementById('random' + questionCounter).setAttribute("class", "randomClass none");
            }
        }
    }



    function getQuestions(test_id) {

// console.log('called');
        test_id = test_id.replace(/ /g, '');

        $.ajax({
            url: "/test_get_ques_ans/",
            type: "POST",
            data: {
                "test_id": test_id
            },
            success: function(data) {
                let parsedData = JSON.parse(data);
                questions = parsedData;
                questionsAns = questions;
                createRandomButtons();
                var yyy = document.getElementById('random' + questionCounter).getAttribute("class");


                if(user_selections)
                {
                    // console.log("first  : " + user_selections);
                    user_selections = user_selections.replace(/None/g, '"None"');
                    user_selections = JSON.parse(user_selections);

                    // console.log('at user_selections[0]'+user_selections[0]);
                    // console.log('at user_selections[1]'+user_selections[1]);


                    // user_selections = user_selections.replace(/[\[\]']+/g,'').split(',');
                }

                for(var i=0;i<user_selections.length;i++)
                {
                    user_selections[i] = String(user_selections[i]);
                    console.log('user_selections[i] = ' + user_selections[i]);
                    console.log('user_selections[i].length = ' + user_selections[i].length);
                    
                    if(user_selections[i] && ( user_selections[i] !== 'None' || user_selections[i] === 0 ) ){
                        console.log('Yes');
                        document.getElementById('random' + i).setAttribute("class", document.getElementById('random' + i).getAttribute("class")+" lightseagreen");
                    }
                }
                displayNext();

            $('.randomClass').removeClass("yellow");

            // console.log('yyy is : ' + yyy);

            var yyy = document.getElementById('random' + questionCounter).getAttribute("class");

            document.getElementById('random' + questionCounter).setAttribute("class",yyy + " yellow");
            },
            error: function(data) {
                alert("Error getting questions from server");
            }
        });
    }
var prev_color;
    window.randomQuesFun = function(i) {

           /* prev_color = document.getElementById('random' + questionCounter).style.background;
            if(prev_color === 'yellow')
            {
                document.getElementById('random' + questionCounter).style.background = 'none';
            }
            else
            {
                document.getElementById('random' + questionCounter).style.background = prev_color;
            }
            debugger;*/

            var yyy = document.getElementById('random' + i).getAttribute("class");

            $('.randomClass').removeClass("yellow");

            document.getElementById('random' + i).setAttribute("class",yyy + " yellow");

            //var tt  = document.getElementById('random' + i).getAttribute("class");
        $('#prev').show();
        $('#next').show();


        if (i < questions.length) {
            choose();
        }
        questionCounter = i;
        displayNext();
    }

    window.selectradio = function(event) {
        //debugger;
        var $radio = $(event.target) // if this was previously checked

        if ($radio.data('waschecked') == true) {

            $radio.prop('checked', false);
            $radio.data('waschecked', false);
            // console.log('coming here');
            if(questions[questionCounter].type === 2)
            {

                // console.log($('[name="answer0"]').prop('checked'));
                // console.log($('[name="answer1"]').prop('checked'));
                // console.log($('[name="answer2"]').prop('checked'));
                // console.log($('[name="answer3"]').prop('checked'));


                if( $('[name="answer0"]').prop('checked') ||
                    $('[name="answer1"]').prop('checked')||
                    $('[name="answer2"]').prop('checked') ||
                    $('[name="answer3"]').prop('checked'))
                {
                    // console.log('questype is 2');
                    document.getElementById('random' + questionCounter).setAttribute("class", "randomClass lightseagreen");
                }
                else
                {
                    // console.log('questype is 2 else ');
                    document.getElementById('random' + questionCounter).setAttribute("class", "randomClass none");
                }
            }
            else
            {
                // console.log('questype is  not 2');
                document.getElementById('random' + questionCounter).setAttribute("class", "randomClass none");
            }



        } else {
            $radio.data('waschecked', true); // remove was checked from other radio

            document.getElementById('random' + questionCounter).setAttribute("class", document.getElementById('random' + questionCounter).getAttribute("class")+" lightseagreen");
        }
        // $radio.siblings('input[name="rad"]').data('waschecked', false);
        $radio.closest("ul").find('input').each(function(index, elem) {
            if($(elem).data('waschecked') == true){
                $(elem).data('waschecked', true);
            }
            else if (elem != event.target) {
                $(elem).data('waschecked', false);
            }
            // if($(elem).data('waschecked') == false){
            //     $(elem).data('waschecked', true);
            // }
        });


    }

    // Displays next requested element
    window.displayNext = function() {

       //console.log('questionCounter is :' + questionCounter);
       //var random_button = document.getElementById('random0');
       //console.log('random_button is : ' + random_button);
       //random_button.background = 'yellow';

        quiz.fadeOut(function() {
            $('#question').remove();
            if (questionCounter < questions.length) {
                $('#end_of_test_div').hide();
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();

                // console.log('in displayNext, selections[questionCounter] is : ' + selections[questionCounter]);

                var q_type = questions[questionCounter].type;
                // console.log('q_type at displayNext is : ' + q_type);

                if (!(isNaN(selections[questionCounter]))) {
                    if(q_type == 1)
                    {
                        $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                        $('input[value=' + selections[questionCounter] + ']').data('waschecked', true);
                    }
                    else if(q_type == 3)
                    {
                        // console.log('q_type is 3');
                        // console.log(selections[questionCounter]);
                        $('input[id=int_ans' + questionCounter + ']').val(selections[questionCounter]);
                    }
                    // console.log('not NaN');
                }
                else
                {
                    if(q_type == 2)
                    {
                        // console.log('q_type is 2');
                        // console.log(selections[questionCounter]);
                        var ans_arr = selections[questionCounter];
                        if(undefined !== ans_arr)
                        {
                            for(var i=0;i<ans_arr.length;i++)
                            {
                                if (!(isNaN(ans_arr[i]))) {
                                    $('input[value=' + selections[questionCounter][i] + ']').prop('checked', true);
                                    $('input[value=' + selections[questionCounter][i] + ']').data('waschecked', true);

                                }
                             }

                        }
                    }
                    // console.log(typeof selections[questionCounter]);
                    // console.log('is NaN');
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                // console.log('questionCounter is less than questions length');
                $('#next').hide();
                $('#end_of_test_div').show();

            }

            var math = MathJax.Hub.getAllJax("question");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);

        if(user_selections[questionCounter])
        {
                        // console.log(user_selections[questionCounter]);
            if(user_selections[questionCounter] === 'None')
            {
                // console.log('None, not answered');
                document.getElementById('timerCount').innerHTML = 'Not Answered';
            }
            else
            {
                document.getElementById('timerCount').innerHTML = 'Answered';
            }
        }
        else
        {
            document.getElementById('timerCount').innerHTML = 'Not Answered';
        }

        });
    }

    // Click handler for the 'submitQuiz' button
    $('#submitQuiz').on('click', function(e) {
        if(isSubmit === 1)
            return;
        $('#end_of_test_div').hide();
        isSubmit = 1;
        $('#timerCount').hide();
        $('#prev').hide();
        if (questionCounter < questions.length) {
            choose();
        }

        var test_id = $('#test_id_div').text();
        getAnswers(test_id);

        e.preventDefault();
        $(window).off('beforeunload');
        return false;
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
                document.getElementById('nav_for_questions').insertAdjacentHTML('afterbegin', "<h4 id='nav_for_questions'>You can use the below for " +
                    "correct answers </h4>");
            },
            error: function(data) {
                console.log("Error getting questions from server");
            }
        });
    }




    // Computes score and returns a paragraph element to be displayed
    function displayScore(questionsAns) {

        var positive_marks_1 = parseInt($('#positive_marks_div').text());

        var negative_marks_1 = parseInt($('#negative_marks_div').text());

        $('#question').hide();
        var score = $('<p>', {
            id: 'score'
        });
        var totalMarks = $('#total_marks_div').text();

        var positive_score = 0;
        var negative_score = 0;

        var no_of_correct_ans_ques = 0;
        var no_of_wrong_ans_ques = 0;
        var no_of_not_ans_ques = 0;
        var no_of_attempted_ans_ques = 0;
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
        // console.log('printing selections as below:');
        // console.log(selections);
        for (i; i < selections.length; i++) {

            var ans = questions[i].choices;
            var userAns = selections[i];

            var ques_type = questions[i].type;
            if(ques_type === 1)
            {
                if (userAns === questionsAns[i].correctAnswer - 1)
                {
                    no_of_attempted_ans_ques += 1;

                    var section_score = section_total_score_map.get(questionsAns[i].section);
                    section_score += positive_marks_1;
                    section_total_score_map.set(questionsAns[i].section, section_score);

                    var section_score_positive = section_positive_score_map.get(questionsAns[i].section);
                    section_score_positive += positive_marks_1;
                    section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                    var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                    section_attempted_questions += 1;
                    section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                    var section_correct_attempted_questions = section_correct_attempted_questions_map.get(questionsAns[i].section);
                    section_correct_attempted_questions += 1;
                    section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions);


                    positive_score += positive_marks_1;
                    no_of_correct_ans_ques += 1;
                }
                else if ((userAns !== undefined) && !(isNaN(userAns)) ) {

                    no_of_attempted_ans_ques += 1;
                    var section_score = section_total_score_map.get(questionsAns[i].section);
                    section_score -= negative_marks_1;
                    section_total_score_map.set(questionsAns[i].section, section_score);


                    var section_score_negative = section_negative_score_map.get(questionsAns[i].section);
                    section_score_negative += negative_marks_1;
                    section_negative_score_map.set(questionsAns[i].section, section_score_negative);

                    var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                    section_attempted_questions += 1;
                    section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                    var section_wrong_attempted_questions = section_wrong_attempted_questions_map.get(questionsAns[i].section);
                    section_wrong_attempted_questions += 1;
                    section_wrong_attempted_questions_map.set(questionsAns[i].section, section_wrong_attempted_questions);

                    negative_score += negative_marks_1;
                    no_of_wrong_ans_ques += 1;
                }
                else
                {
                    var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[i].section);
                    section_un_attempted_questions += 1;
                    section_un_attempted_questions_map.set(questionsAns[i].section, section_un_attempted_questions);
                    no_of_not_ans_ques += 1;
                }
            }
            else if(ques_type === 3)
            {
                if(userAns)
                {
                    var decimal = userAns.toString();
                    decimal = decimal.split('.');
                    // console.log('decPart is : ' + decimal[1][0]);
                }
                if (userAns && (userAns == questionsAns[i].correctAnswer ||
                    (decimal[0] === questionsAns[i].correctAnswer && decimal[1][0] === 0)))
                {
                    no_of_attempted_ans_ques += 1;

                    var section_score = section_total_score_map.get(questionsAns[i].section);
                    section_score += positive_marks_1;
                    section_total_score_map.set(questionsAns[i].section, section_score);

                    var section_score_positive = section_positive_score_map.get(questionsAns[i].section);
                    section_score_positive += positive_marks_1;
                    section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                    var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                    section_attempted_questions += 1;
                    section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                    var section_correct_attempted_questions = section_correct_attempted_questions_map.get(questionsAns[i].section);
                    section_correct_attempted_questions += 1;
                    section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions);


                    positive_score += positive_marks_1;
                    no_of_correct_ans_ques += 1;
                }
                else if ((userAns !== undefined) && !(isNaN(userAns)) && userAns !=='' ) {

                    no_of_attempted_ans_ques += 1;
                    var section_score = section_total_score_map.get(questionsAns[i].section);
                    section_score -= negative_marks_1;
                    section_total_score_map.set(questionsAns[i].section, section_score);


                    var section_score_negative = section_negative_score_map.get(questionsAns[i].section);
                    section_score_negative += negative_marks_1;
                    section_negative_score_map.set(questionsAns[i].section, section_score_negative);

                    var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                    section_attempted_questions += 1;
                    section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                    var section_wrong_attempted_questions = section_wrong_attempted_questions_map.get(questionsAns[i].section);
                    section_wrong_attempted_questions += 1;
                    section_wrong_attempted_questions_map.set(questionsAns[i].section, section_wrong_attempted_questions);

                    negative_score += negative_marks_1;
                    no_of_wrong_ans_ques += 1;
                }
                else
                {
                    var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[i].section);
                    section_un_attempted_questions += 1;
                    section_un_attempted_questions_map.set(questionsAns[i].section, section_un_attempted_questions);
                    no_of_not_ans_ques += 1;
                }
            }
            if(ques_type === 2)
            {
                // console.log('ques_type is 2');
                var ans_list = [];
                var crct_ans_list = questionsAns[i].correctAnswer;

                for(var j=0;j<crct_ans_list.length;j++)
                {
                    ans_list.push(crct_ans_list.charAt(j))
                }
                ans_list = ans_list.map(function(item) {
                    return parseInt(item, 10);
                });

                // console.log('ans_list is : ' + ans_list);

                var newArray =[];
                if(userAns !== undefined){
                    newArray = userAns.filter(function (value) {
                    return !Number.isNaN(value);
                    })
                }
                // console.log('userAns is : ' + userAns);
                var correct_ans_list_size = ans_list.length;
                // console.log('newArray is : ' + newArray);

                if ((newArray !== undefined) && newArray.length > 0 && (newArray.every(function(val) { return ans_list.indexOf(val+1) >= 0; })))
                {
                                        // console.log('if');
                        no_of_attempted_ans_ques += 1;
                        no_of_correct_ans_ques += 1;

                        if(newArray.length == ans_list.length)
                        {
                            var section_score = section_total_score_map.get(questionsAns[i].section);
                            // console.log('positive_score is : ' + positive_score);
                            section_score += 4;
                            section_total_score_map.set(questionsAns[i].section, section_score);

                            var section_score_positive = section_positive_score_map.get(questionsAns[i].section);
                            section_score_positive += 4;
                            section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                            var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                            section_attempted_questions += 1;
                            section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                            var section_correct_attempted_questions = section_correct_attempted_questions_map.get(questionsAns[i].      section);
                            section_correct_attempted_questions += 1;
                            section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions    );

                            positive_score += 4;


                        }
                        else
                        {
                            var section_score = section_total_score_map.get(questionsAns[i].section);
                            section_score += 2;
                            section_total_score_map.set(questionsAns[i].section, section_score);

                            var section_score_positive = section_positive_score_map.get(questionsAns[i].section);
                            section_score_positive += 2;
                            section_positive_score_map.set(questionsAns[i].section, section_score_positive);

                            var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                            section_attempted_questions += 1;
                            section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                            var section_correct_attempted_questions = section_correct_attempted_questions_map.get(questionsAns[i].      section);
                            section_correct_attempted_questions += 1;
                            section_correct_attempted_questions_map.set(questionsAns[i].section, section_correct_attempted_questions    );

                            positive_score += 2;
                        }

                }
                else if ((newArray !== undefined) && ! newArray.every(function(val) { return ans_list.indexOf(val+1) >= 0; }))
                {
                    no_of_attempted_ans_ques += 1;
                    var section_score = section_total_score_map.get(questionsAns[i].section);
                    section_score -= 2;
                    section_total_score_map.set(questionsAns[i].section, section_score);


                    var section_score_negative = section_negative_score_map.get(questionsAns[i].section);
                    section_score_negative += 2;
                    section_negative_score_map.set(questionsAns[i].section, section_score_negative);

                    var section_attempted_questions = section_attempted_questions_map.get(questionsAns[i].section);
                    section_attempted_questions += 1;
                    section_attempted_questions_map.set(questionsAns[i].section, section_attempted_questions);

                    var section_wrong_attempted_questions = section_wrong_attempted_questions_map.get(questionsAns[i].section);
                    section_wrong_attempted_questions += 1;
                    section_wrong_attempted_questions_map.set(questionsAns[i].section, section_wrong_attempted_questions);

                    negative_score += 2;
                    no_of_wrong_ans_ques += 1;
                }
                else if((newArray !== undefined) && newArray.length == 0)
                {
                    var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[i].section);
                    section_un_attempted_questions += 1;
                    section_un_attempted_questions_map.set(questionsAns[i].section, section_un_attempted_questions);
                    no_of_not_ans_ques += 1;
                }
            }
    }

        if (i <= questionsAns.length - 1) {
            no_of_not_ans_ques += questionsAns.length - i;

            for (var j = i; j <= questionsAns.length - 1; j++) {
                var section_un_attempted_questions = section_un_attempted_questions_map.get(questionsAns[j].section);
                section_un_attempted_questions += 1;
                section_un_attempted_questions_map.set(questionsAns[j].section, section_un_attempted_questions);
            }
        }

        var color_of_report_heading = '<font color="darkcyan">';
        var color_of_report_details = '<font color="#000099">';
        var color_of_report_values = '<font color="darkcyan">';

        var finalScore = positive_score - negative_score;

        score.append(color_of_report_heading + '&nbsp &nbsp &nbsp Report : ' + color_of_report_details +
            ' <br> Total Questions : ' + color_of_report_values + questionsAns.length + color_of_report_details +
            ' <br> Questions Attempted : ' + color_of_report_values + no_of_attempted_ans_ques + color_of_report_details +
            ' <br> Questions Not Attempted : ' + color_of_report_values + no_of_not_ans_ques + color_of_report_details +
            ' <br> Your Score :   ' + color_of_report_values + finalScore + ' / ' + totalMarks + color_of_report_details +
            ' <br> Positive Marks : ' + color_of_report_values + positive_score + color_of_report_details +
            ' <br> Negative Marks : ' + color_of_report_values + negative_score + color_of_report_details +
            ' <br> Answers Correct : ' + color_of_report_values + no_of_correct_ans_ques + color_of_report_details +
            ' <br> Answers Wrong : ' + color_of_report_values + no_of_wrong_ans_ques
        );

        var time_taken_test = Math.round(window.time / 60);
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
            section_wrong_attempted_questions_map,
            time_taken_test,
            selections,

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
        section_wrong_attempted_questions_map,
        time_taken_test,
        selections
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
                "map_total_score": JSON.stringify(Array.from(section_total_score_map.entries())),
                "map_positive_score": JSON.stringify(Array.from(section_positive_score_map.entries())),
                "map_negative_score": JSON.stringify(Array.from(section_negative_score_map.entries())),
                "map_attempted": JSON.stringify(Array.from(section_attempted_questions_map.entries())),
                "map_un_attempted": JSON.stringify(Array.from(section_un_attempted_questions_map.entries())),
                "map_correct_attempted": JSON.stringify(Array.from(section_correct_attempted_questions_map.entries())),
                "map_wrong_attempted": JSON.stringify(Array.from(section_wrong_attempted_questions_map.entries())),
                "time_taken_test": time_taken_test,
                "selections" : JSON.stringify(Array.from(selections))
            },
            success: function(data) {},
            error: function(data) {
                console.log("Error updating user score");
            }
        });
    }

})();
