from datetime import datetime
from hashlib import md5
from time import time
from flask import current_app
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from app import db, login
from datetime import datetime



followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

user_tests = db.Table('user_tests',
    db.Column('id',db.Integer, primary_key=True),
    db.Column('test_id', db.Integer, db.ForeignKey('test.id'), nullable=False),
    db.Column('user_id',db.Integer, db.ForeignKey('user.id'), nullable=False),
    db.Column('user_score',db.Integer, nullable=False, default=0),
    db.Column('positive_score', db.Integer, nullable=False, default=0),
    db.Column('negative_score', db.Integer, nullable=False, default=0),
    db.Column('correct_answers', db.Integer, nullable=False, default=0),
    db.Column('wrong_answers', db.Integer, nullable=False, default=0),
    db.Column('no_answers', db.Integer, nullable=False, default=0),
    db.Column('attempted_ques', db.Integer, nullable=False, default=0),
    db.Column('test_taken_on_date', db.DateTime(timezone=True), nullable=False, default=datetime.now)    
)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    tests = db.relationship('Test', backref='creator', lazy='dynamic')
    is_admin = db.Column(db.Integer, nullable=False, default=0)
    about_me = db.Column(db.String(140))
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    _user_tests = db.relationship(
        "Test",
        secondary=user_tests,
        back_populates="user_taken_tests")

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
    test_name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50))
    instructions = db.Column(db.String(1000), nullable=False)
    no_of_questions = db.Column(db.Integer, nullable=False)
    total_marks = db.Column(db.Integer, nullable=False)
    time_in_mins = db.Column(db.Integer, nullable=False, default=180)
    date_posted = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now)   
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    _users = db.relationship(
        "User",
        secondary=user_tests,
        back_populates="users_of_tests")
    def __repr__(self):
        return "Test('{}','{}''{}')".format(self.id,self.test_name, self.category, self.no_of_questions, self.user_id)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(100), nullable=False)
    question_content = db.Column(db.String(500), nullable=False)
    a = db.Column(db.String(100), nullable=False)
    b = db.Column(db.String(100), nullable=False)
    c = db.Column(db.String(100), nullable=False)
    d = db.Column(db.String(100), nullable=False)
    ans = db.Column(db.String(100), nullable=False)
    positive_marks = db.Column(db.Integer, nullable=False)
    negative_marks = db.Column(db.Integer, nullable=False)
    date_posted = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now)   

    def __repr__(self):
        return "Question('{}','{}''{}')".format(self.id, self.question_content, self.positive_marks)

class TestQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    questions = db.relationship('Question', backref='NameOfTest', lazy=True)
    
    def __repr__(self):
        return "TestQuestion('{}','{}')".format(self.test_id, self.id)







tags = db.Table('tags',
    db.Column('parent_id', db.Integer, db.ForeignKey('parent.id')),
    db.Column('child_id', db.Integer, db.ForeignKey('child.id')),
    db.Column('correct_answers', db.Integer),
    db.Column('wrong_answers', db.Integer),
    child = db.relationship('Child', backref=db.backref('parent_assoc')),
    parent = db.relationship('Parent', backref=db.backref('child_assoc'))
    #db.backref('followers', lazy='dynamic')
)

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_name = db.Column(db.String(100))
    children = db.relationship(
        "Child",
        secondary=tags,
        back_populates="parents")
    def __init__(self, name): 
        self.parent_name = name 

    def __repr__(self):
        return '<Parent %r>' % self.parent_name


class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(100))
    parents = db.relationship(
        "Parent",
        secondary=tags,
        back_populates="children")
    def __init__(self, name): 
        self.child_name = name 

    def __repr__(self):
        return '<Child %r>' % self.child_name




tags = db.Table('tags',
    db.Column('parent_id', db.Integer, db.ForeignKey('parent.id')),
    db.Column('child_id', db.Integer, db.ForeignKey('child.id')),
    db.Column('correct_answers', db.Integer),
    db.Column('wrong_answers', db.Integer),
    child = db.relationship('Child', backref=db.backref('parent_assoc')),
    parent = db.relationship('Parent', backref=db.backref('child_assoc'))
    #db.backref('followers', lazy='dynamic')
)

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_name = db.Column(db.String(100))
    children = db.relationship(
        "Child",
        secondary=tags,
        back_populates="parents")
    def __init__(self, name): 
        self.parent_name = name 

    def __repr__(self):
        return '<Parent %r>' % self.parent_name


class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_name = db.Column(db.String(100))
    parents = db.relationship(
        "Parent",
        secondary=tags,
        back_populates="children")
    def __init__(self, name): 
        self.child_name = name 

    def __repr__(self):
        return '<Child %r>' % self.child_name

