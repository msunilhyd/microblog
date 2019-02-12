
from flask import render_template, redirect, url_for, flash, request, json, request, abort,jsonify,Markup
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required

from flask_babel import _
from app import db
from app.auth import bp
from app.auth.forms import LoginForm, RegistrationForm, \
    ResetPasswordRequestForm, ResetPasswordForm
from app.models import User, Test, TestQuestion, Question, UserTest
from app.auth.email import send_password_reset_email
from app.tests import bp

from app.tests.forms import TestForm, TestQuestionForm



@bp.route("/tests")
def tests():    
    tests = Test.query.order_by(Test.date_posted.desc())
    return render_template('tests/alltests.html', tests=tests)


@bp.route("/test/new", methods=['GET', 'POST'])
@login_required
def new_test():
	form = TestForm()
	if form.validate_on_submit():
		instrString = form.instructions.data.replace('\r', '').replace('\n', '<br>')
		test = Test(test_name=form.test_name.data, category=form.category.data, no_of_questions=form.no_of_questions.data, instructions=instrString,total_marks=form.total_marks.data, time_in_mins=form.time_in_mins.data, creator=current_user)
		db.session.add(test)
		db.session.commit()
		test = Test.query.filter_by(test_name=form.test_name.data).order_by(Test.date_posted.desc()).first()

		flash("You test has been created", "success")
		return redirect(url_for('tests.new_test_question', test_id=test.id))

	return render_template('tests/create_test.html', title="New Test", form=form, legend='New test')



@bp.route("/new_test_question/<int:test_id>", methods=['GET', 'POST'])
@login_required
def new_test_question(test_id):
	form = TestQuestionForm()
	if form.validate_on_submit():
		current_question = Question(section=form.section.data,question_content=form.question_content.data, a=form.a.data, b=form.b.data, c=form.c.data, d=form.d.data, ans=form.ans.data,positive_marks=form.positive_marks.data, negative_marks=form.negative_marks.data)
		db.session.add(current_question)
		db.session.commit()
		question = Question.query.filter_by(question_content=form.question_content.data).order_by(Question.date_posted.desc()).first()
		flash("You Question has been created", "success")
		testQuestion = TestQuestion(test_id=test_id, question_id=question.id)
		db.session.add(testQuestion)
		db.session.commit()
		return redirect(url_for('tests.tests'))
	return render_template('tests/create_test_questions.html', title="New Test Question", form=form, legend='New test Question')


@bp.route("/test/<int:test_id>")
def test(test_id):
	user_id = request.args.get('user_id', None)
	test = Test.query.get_or_404(test_id)	
	usertest = UserTest.query.filter_by(test_id=test_id, user_id=user_id).first()

	return render_template('tests/test.html', test=test, usertest=usertest)


@bp.route("/show_questions/<int:test_id>",  methods=['GET', 'POST'])
@login_required
def show_questions(test_id):
	test = Test.query.get_or_404(test_id)
	question = TestQuestion.query.filter_by(test_id=test_id)
	if(len(question.all()) == 0):
		return redirect(url_for('new_test_question', test_id=test_id))


	else:
		print("Questions added already")

	flash('Your test is not empty! You can add more questions', 'success')
	return redirect(url_for('tests.new_test_question', test_id=test_id))


@bp.route("/take_test/<int:test_id>",  methods=['GET', 'POST'])
@login_required
def take_test(test_id):
	test = Test.query.get_or_404(test_id)
	question = TestQuestion.query.filter_by(test_id=test_id)
	q = (db.session.query(TestQuestion, Question)
    .filter(TestQuestion.test_id == test_id)
    .filter(TestQuestion.question_id == Question.id)
    .all())
	test.instructions = Markup(test.instructions)

	if(len(question.all()) == 0):
		return redirect(url_for('tests.new_test_question', test_id=test_id))

	else:
		print("Questions ready to take the test")
		return render_template('tests/new_tests.html', title="Taking Test", legend='Take test', test = test)

	flash('Your test is not empty! You can add more questions', 'success')
	return redirect(url_for('new_test_question', test_id=test_id))



@bp.route("/test_get_questions/", methods=['GET','POST'])
def test_get_questions():
	test_id = request.form['test_id']
	
	q = (db.session.query(TestQuestion, Question)
    .filter(TestQuestion.test_id == test_id)
    .filter(TestQuestion.question_id == Question.id)
    .all())

	empList = []
	choices = []
	for emp in q:
		choices.append(emp.Question.a);
		choices.append(emp.Question.b);
		choices.append(emp.Question.c);
		choices.append(emp.Question.d);
		
		empDict = {
		'question': emp.Question.question_content,
		'choices' : choices,
		'positive_marks' : emp.Question.positive_marks,
		'negative_marks' : emp.Question.negative_marks,
		'section' : emp.Question.section
		}
		choices = []
		empList.append(empDict)
	return json.dumps(empList)




@bp.route("/test_get_answers/", methods=['GET','POST'])
def test_get_answers():
	test_id = request.form['test_id']
	
	q = (db.session.query(TestQuestion, Question)
    .filter(TestQuestion.test_id == test_id)
    .filter(TestQuestion.question_id == Question.id)
    .all())
	empList = []
	for emp in q:		
		empDict = {
		'correctAnswer': emp.Question.ans,
		'positive_marks' : emp.Question.positive_marks,
		'negative_marks' : emp.Question.negative_marks,
		'section' : emp.Question.section
		}
		empList.append(empDict)
	return json.dumps(empList)


@bp.route("/test_update_user_score/", methods=['GET','POST'])
def test_update_user_score():

	test_id = request.form['test_id']
	user_id = request.form['user_id']
	user_score = request.form['user_score']
	positive_score = request.form['positive_score']
	negative_score = request.form['negative_score']
	correct_answers = request.form['correct_answers']
	wrong_answers = request.form['wrong_answers']
	no_answers = request.form['no_answers']
	attempted_ques = request.form['no_of_attempted_ans_ques']

	map_total_score = request.form['map_total_score']
	map_positive_score = request.form['map_positive_score']
	map_negative_score = request.form['map_negative_score']
	map_attempted = request.form['map_attempted']
	map_un_attempted = request.form['map_un_attempted']

	print('Printing json:')
	print(type(map_total_score))
	print(map_total_score[0])
	print(map_positive_score)
	print(map_negative_score)
	print(map_attempted)
	print(map_un_attempted)


	string = "[[0,0,0],[0,0,1],[1,1,0]]"
	strs = string.replace('[','').split('],')
	lists = [map(int, s.replace(']','').split(',')) for s in strs]
	print('Printing lists : ')
	print(lists[0])
	print(lists[1])
	print(lists[2])

	string = map_total_score
	strs = string.replace('[','').split('],')
	lists = [map(int, s.replace(']','').split(',')) for s in strs]

	print('type(lists) is : ')
	print(type(lists))

	print('Printing map_total_score lists : ')
	print((lists))
	print(lists[1])
	print(lists[2])

	print("Hello")
	print(list(map(min, [1,2,3,4], [0,10,0,10])))
	
	

	print('Printing len : ')
	print(len(map_total_score))

	usertest = UserTest(test_id=test_id, user_id=user_id,user_score=user_score, positive_score=positive_score,negative_score=negative_score, correct_answers=correct_answers,wrong_answers=wrong_answers,no_answers=no_answers, attempted_ques=attempted_ques )
	db.session.add(usertest)
	db.session.commit()

	return "Succesfully updated user score"

