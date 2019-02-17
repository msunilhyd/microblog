from datetime import datetime
from hashlib import md5
from time import time
from flask import current_app
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from app import db, login
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
 

Base = declarative_base()


class Department(db.Model):
    __tablename__ = 'department'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    employees = db.relationship(
        'Employee',
        secondary='department_employee_link'
    )
 
 
class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    hired_on = db.Column(db.DateTime, default=func.now())
    departments = db.relationship(
        Department,
        secondary='department_employee_link'
    )
 
 
class DepartmentEmployeeLink(db.Model):
    __tablename__ = 'department_employee_link'
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    extra_data = db.Column(db.String(256))
    department = db.relationship(Department, backref=db.backref("employee_assoc"))
    employee = db.relationship(Employee, backref=db.backref("department_assoc"))


followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)



class User(UserMixin, db.Model):
    __searchable__ = ['username']
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), index=True, unique=True)
    first_name = db.Column(db.String(60), index=True)
    last_name = db.Column(db.String(60), index=True)
    coach = db.Column(db.String(120), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    tests = db.relationship('Test', backref='creator', lazy='dynamic')
    is_admin = db.Column(db.Integer, nullable=False, default=0)
    is_confirmed = db.Column(db.Integer, nullable=False, default=0)
    about_me = db.Column(db.Text)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    image_file = db.Column(db.String(64), nullable=False, default='default.jpg')
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def followed_posts(self):
        followed = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)
        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.timestamp.desc())

    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'],
            algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

    def get_confirm_email_token(self, expires_in=600):
        return jwt.encode(
        {'confirm_email': self.id, 'exp': time() + expires_in},
        current_app.config['SECRET_KEY'],
        algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_confirm_email_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['confirm_email']
        except:
            return
        return User.query.get(id)

    def tests_taken(self):
        testResults = UserTest.query.filter_by(user_id=self.id)
        return testResults.order_by(testResults.timestamp.desc())


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class Post(db.Model):
    __searchable__ = ['body']
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_name = db.Column(db.String(50), index=True,nullable=False)
    category = db.Column(db.String(50), index=True)
    instructions = db.Column(db.String(1000), nullable=False)
    total_no_of_questions = db.Column(db.Integer, nullable=False, default=0)
    no_of_questions_maths = db.Column(db.Integer, nullable=False, default=0)
    no_of_questions_physics = db.Column(db.Integer, nullable=False, default=0)
    no_of_questions_chemistry = db.Column(db.Integer, nullable=False, default=0)
    total_marks = db.Column(db.Integer, nullable=False, default=0)
    marks_maths = db.Column(db.Integer, nullable=False, default=0)
    marks_physics = db.Column(db.Integer, nullable=False, default=0)
    marks_chemistry = db.Column(db.Integer, nullable=False, default=0)
    time_in_mins = db.Column(db.Integer, nullable=False, default=180)
    positive_marks = db.Column(db.Integer, nullable=False, default=4)
    negative_marks = db.Column(db.Integer, nullable=False, default=1)
    author_maths = db.Column(db.String(120))
    author_physics = db.Column(db.String(120))
    author_chemistry = db.Column(db.String(120))
    date_posted = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    questions = db.relationship('TestQuestion', backref='NameOfTest', lazy=True)

    def __repr__(self):
        return "Test('{}','{}''{}')".format(self.id,self.test_name, self.category, self.total_no_of_questions, self.user_id)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(20), index=True, nullable=False)
    question_content = db.Column(db.String(1000), nullable=False)
    question_image = db.Column(db.String(20))
    a = db.Column(db.String(500), nullable=False)
    b = db.Column(db.String(500), nullable=False)
    c = db.Column(db.String(500), nullable=False)
    d = db.Column(db.String(500), nullable=False)
    ans = db.Column(db.Integer, nullable=False)
    sub_section = db.Column(db.String(50), index=True)
    level = db.Column(db.Integer)
    date_posted = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return "Question('{}','{}''{}')".format(self.id, self.question_content, self.positive_marks)

class TestQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    
    def __repr__(self):
        return "TestQuestion('{}','{}')".format(self.test_id, self.id)


class UserTest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_score = db.Column(db.Integer, nullable=False, default=0)
    positive_score = db.Column(db.Integer, nullable=False, default=0)
    negative_score = db.Column(db.Integer, nullable=False, default=0)
    correct_answers = db.Column(db.Integer, nullable=False, default=0)
    wrong_answers = db.Column(db.Integer, nullable=False, default=0)
    no_answers = db.Column(db.Integer, nullable=False, default=0)
    attempted_ques = db.Column(db.Integer, nullable=False, default=0)
    total_score_maths = db.Column(db.Integer, nullable=False, default=0)
    total_score_physics = db.Column(db.Integer, nullable=False, default=0)
    total_score_chemistry = db.Column(db.Integer, nullable=False, default=0)
    positive_score_maths = db.Column(db.Integer, nullable=False, default=0)
    positive_score_physics = db.Column(db.Integer, nullable=False, default=0)
    positive_score_chemistry = db.Column(db.Integer, nullable=False, default=0)
    negative_score_maths = db.Column(db.Integer, nullable=False, default=0)
    negative_score_physics = db.Column(db.Integer, nullable=False, default=0)
    negative_score_chemistry = db.Column(db.Integer, nullable=False, default=0)
    attempted_maths = db.Column(db.Integer, nullable=False, default=0)
    attempted_physics = db.Column(db.Integer, nullable=False, default=0)
    attempted_chemistry = db.Column(db.Integer, nullable=False, default=0)
    un_attempted_maths = db.Column(db.Integer, nullable=False, default=0)
    un_attempted_physics = db.Column(db.Integer, nullable=False, default=0)
    un_attempted_chemistry = db.Column(db.Integer, nullable=False, default=0)
    correct_attempted_maths = db.Column(db.Integer, nullable=False, default=0)
    correct_attempted_physics = db.Column(db.Integer, nullable=False, default=0)
    correct_attempted_chemistry = db.Column(db.Integer, nullable=False, default=0)
    wrong_attempted_maths = db.Column(db.Integer, nullable=False, default=0)
    wrong_attempted_physics = db.Column(db.Integer, nullable=False, default=0)
    wrong_attempted_chemistry = db.Column(db.Integer, nullable=False, default=0)
    timestamp = db.Column(db.DateTime(timezone=True), index=True, nullable=False, default=datetime.utcnow)
    test = db.relationship(Test, backref=db.backref("test_assoc"))
    user = db.relationship(User, backref=db.backref("user_assoc"))

    __table_args__ = (db.UniqueConstraint('test_id', 'user_id'), )

    def __repr__(self):
        return "UserTest('{}','{}''{}')".format(self.id, self.test_id, self.user_id, self.user_score, self.test, self.user)


