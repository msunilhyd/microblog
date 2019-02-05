from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, SubmitField, TextAreaField, IntegerField, SelectField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo

class TestForm(FlaskForm):
	test_name = StringField('Test Name', validators=[DataRequired()])
	category = StringField('Test category', validators=[DataRequired()])
	no_of_questions = IntegerField('Total No:of Questions', validators=[DataRequired()])
	total_marks = IntegerField('Total Marks', validators=[DataRequired()])
	time_in_mins = IntegerField('Test time in Minutes', validators=[DataRequired()])
	instructions = TextAreaField('Instructions', validators=[DataRequired()])
	submit = SubmitField('Submit')



class TestQuestionForm(FlaskForm):
	section = SelectField('Section', choices = [('Maths', 'Maths'), 
      ('Physics', 'Physics'), ('Chemistry', 'Chemistry')])
	question_content = StringField('Question', validators=[DataRequired()])
	a = StringField('A', validators=[DataRequired()])
	b = StringField('B', validators=[DataRequired()])
	c = StringField('C', validators=[DataRequired()])
	d = StringField('D', validators=[DataRequired()])
	ans = StringField('Answer', validators=[DataRequired()])
	positive_marks = IntegerField('Positive Marks', validators=[DataRequired()])
	negative_marks = IntegerField('Negative Marks', validators=[DataRequired()])
	submit = SubmitField('Submit')
