
from flask import render_template, redirect, url_for, flash, request, json, request, abort, jsonify, Markup
from werkzeug.urls import url_parse
from flask_login import login_user, logout_user, current_user, login_required

from flask_babel import _
from app import db
from app.auth import bp
from app.auth.forms import LoginForm, RegistrationForm, \
    ResetPasswordRequestForm, ResetPasswordForm
from app.models import User, Test, TestQuestion, Question, UserTest, ChildrenTestTypes, ParentTestTypes, ParentChildTests
from app.auth.email import send_score_sheet_email
from app.tests import bp
import ast
import json

from app.tests.forms import TestForm, TestQuestionForm


@bp.route("/tests", methods=['GET', 'POST'])
@login_required
def tests():
    parent_test_types = ParentTestTypes.query.order_by(ParentTestTypes.id)
    return render_template('tests/all_parents_test_types.html', parent_test_types=parent_test_types)


@bp.route("/tests_test_type_parent/<int:parent_test_type_id>", methods=['GET', 'POST'])
@login_required
def tests_test_type_parent(parent_test_type_id):
		q = db.session.query(ParentTestTypes, ParentChildTests, ChildrenTestTypes).filter(ParentTestTypes.id == parent_test_type_id).filter(ParentTestTypes.id == ParentChildTests.parent_test_id).filter(ParentChildTests.child_test_id ==ChildrenTestTypes.id).order_by(ChildrenTestTypes.id).all()
		child_test_types = []
		for emp in q:
			child_test_types.append(emp[2])
		return render_template('tests/all_test_types.html', test_types=child_test_types, parent_test_type_id=parent_test_type_id)

@bp.route("/tests/<int:child_test_type_id>", methods=['GET', 'POST'])
@login_required
def tests_final(child_test_type_id):
	tests = Test.query.filter_by(category=child_test_type_id).order_by(Test.date_posted.desc())
	return render_template('tests/alltests.html', tests=tests)
'''
@bp.route("/tests", methods=['GET', 'POST'])
def tests():
    test_types = TestTypes.query.order_by(TestTypes.id.desc())
    return render_template('tests/all_test_types.html', test_types=test_types)

'''
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
@login_required
def test(test_id):
	test = Test.query.get_or_404(test_id)
	usertest = UserTest.query.filter_by(test_id=test_id, user_id=current_user.id).first()
	if usertest is not None:
		return render_template('tests/test.html', test=test, usertest=usertest)
	else:
		print("Questions ready to take the test")
		return render_template('tests/new_tests.html', title="Taking Test", legend='Take test', test = test)

	flash('Your test is not empty! You can add more questions', 'success')
	return redirect(url_for('new_test_question', test_id=test_id))

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
	usertest = UserTest.query.filter_by(test_id=test_id, user_id=current_user.id).first()
	if usertest is not None:
		return render_template('tests/test.html', test=test, usertest=usertest)
	else:
		print("Questions ready to take the test")
		return render_template('tests/new_tests.html', title="Taking Test", legend='Take test', test = test)

	flash('Your test is not empty! You can add more questions', 'success')
	return redirect(url_for('new_test_question', test_id=test_id))



@bp.route("/test_get_questions/", methods=['GET','POST'])
@login_required
def test_get_questions():
	test_id = request.form['test_id']

	q = (db.session.query(TestQuestion, Question)
    .filter(TestQuestion.test_id == test_id)
    .filter(TestQuestion.question_id == Question.id)
    .order_by(Question.section.desc())
    .order_by(Question.id)
    .all())

	empList = []
	choices = []
	for emp in q:
		choices.append(emp.Question.a);
		choices.append(emp.Question.b);
		choices.append(emp.Question.c);
		choices.append(emp.Question.d);

		if emp.Question.e is not None:
			choices.append(emp.Question.e);

		empDict = {
		'question': emp.Question.question_content,
		'choices' : choices,
		'section' : emp.Question.section,
		'sub_section' : emp.Question.sub_section,
		'level' : emp.Question.level,
		'question_image' : emp.Question.question_image,
		'type' : emp.Question.type
		}
		choices = []
		empList.append(empDict)
	return json.dumps(empList)




@bp.route("/test_get_answers/", methods=['GET','POST'])
@login_required
def test_get_answers():
	test_id = request.form['test_id']

	q = (db.session.query(TestQuestion, Question)
    .filter(TestQuestion.test_id == test_id)
    .filter(TestQuestion.question_id == Question.id)
    .order_by(Question.section.desc())
    .order_by(Question.id)
    .all())

	empList = []
	for emp in q:
		# print('correctAnswer is as below : ')
		# print(emp.Question.ans)
		empDict = {
		'correctAnswer': emp.Question.ans,
		'section' : emp.Question.section
		}
		empList.append(empDict)
	return json.dumps(empList)


@bp.route("/test_update_user_score/", methods=['GET','POST'])
@login_required
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

	map_total_score = json.loads(request.form['map_total_score'])
	map_positive_score = json.loads(request.form['map_positive_score'])
	map_negative_score = json.loads(request.form['map_negative_score'])
	map_attempted = json.loads(request.form['map_attempted'])
	map_un_attempted = json.loads(request.form['map_un_attempted'])
	map_correct_attempted = json.loads(request.form['map_correct_attempted'])
	map_wrong_attempted = json.loads(request.form['map_wrong_attempted'])
	time_taken = request.form['time_taken_test']

	map_total_score_list = map_total_score
	total_score_maths = map_total_score_list[0][1]
	total_score_physics = map_total_score_list[1][1]
	total_score_chemistry = map_total_score_list[2][1]

	map_positive_score_list = map_positive_score
	positive_score_maths = map_positive_score_list[0][1]
	positive_score_physics = map_positive_score_list[1][1]
	positive_score_chemistry = map_positive_score_list[2][1]

	map_negative_score_list = map_negative_score
	negative_score_maths = map_negative_score_list[0][1]
	negative_score_physics = map_negative_score_list[1][1]
	negative_score_chemistry = map_negative_score_list[2][1]

	map_attempted_list = map_attempted
	attempted_maths = map_attempted_list[0][1]
	attempted_physics = map_attempted_list[1][1]
	attempted_chemistry = map_attempted_list[2][1]

	map_un_attempted_list = map_un_attempted
	un_attempted_maths = map_un_attempted_list[0][1]
	un_attempted_physics = map_un_attempted_list[1][1]
	un_attempted_chemistry = map_un_attempted_list[2][1]

	map_correct_attempted_list = map_correct_attempted
	correct_attempted_maths = map_correct_attempted_list[0][1]
	correct_attempted_physics = map_correct_attempted_list[1][1]
	correct_attempted_chemistry = map_correct_attempted_list[2][1]

	map_wrong_attempted_list = map_wrong_attempted
	wrong_attempted_maths = map_wrong_attempted_list[0][1]
	wrong_attempted_physics = map_wrong_attempted_list[1][1]
	wrong_attempted_chemistry = map_wrong_attempted_list[2][1]


	if int(user_id) == 1 or int(user_id) == 2:
		print('admin user : ')
		print('Not Updating DB.')
		return "Admin user, Not updating db";
	usertest = UserTest(test_id=test_id, user_id=user_id,user_score=user_score, time_taken=time_taken, positive_score=positive_score,negative_score=negative_score, correct_answers=correct_answers,wrong_answers=wrong_answers,no_answers=no_answers, attempted_ques=attempted_ques,total_score_maths = total_score_maths,total_score_physics = total_score_physics,total_score_chemistry = total_score_chemistry,positive_score_maths = positive_score_maths,positive_score_physics = positive_score_physics,positive_score_chemistry = positive_score_chemistry,negative_score_maths = negative_score_maths,negative_score_physics = negative_score_physics,negative_score_chemistry = negative_score_chemistry,attempted_maths = attempted_maths,attempted_physics = attempted_physics,attempted_chemistry = attempted_chemistry,un_attempted_maths = un_attempted_maths,un_attempted_physics = un_attempted_physics,un_attempted_chemistry = un_attempted_chemistry,correct_attempted_maths = correct_attempted_maths,correct_attempted_physics = correct_attempted_physics,correct_attempted_chemistry = correct_attempted_chemistry,wrong_attempted_maths = wrong_attempted_maths,wrong_attempted_physics = wrong_attempted_physics,wrong_attempted_chemistry = wrong_attempted_chemistry,)
	db.session.add(usertest)
	db.session.commit()
	usertest = UserTest.query.filter_by(test_id=test_id, user_id=user_id).order_by(UserTest.timestamp.desc()).first()

	send_score_sheet_email(usertest.user, usertest.test, usertest)

	return "Succesfully updated user score"

