from flask import render_template, current_app
from app.email import send_email


def send_password_reset_email(user):
  token = user.get_reset_password_token()
  send_email('[GradeMatrix] Reset Your Password',
             sender=current_app.config['ADMINS'][0],
             recipients=[user.email],
             text_body=render_template('email/reset_password.txt',
                                       user=user, token=token),
             html_body=render_template('email/reset_password.html',
                                       user=user, token=token))


def send_confirm_email(user):
  token = user.get_confirm_email_token()
  send_email('[GradeMatrix] Confirm Your Email',
             sender=current_app.config['ADMINS'][0],
             recipients=[user.email],
             text_body=render_template('email/confirm_email.txt',
                                       user=user, token=token),
             html_body=render_template('email/confirm_email.html',
                                       user=user, token=token))


def send_score_sheet_email(user, test, usertest):
  print('printing from send_score_sheet_email')
  print(user)
  print(test)
  print(usertest)

  send_email('[GradeMatrix] Test Results in Detail : ',
             sender=current_app.config['ADMINS'][0],
             recipients=[user.email],
             text_body=render_template('email/score_email.txt',
                                       user=user, test=test, usertest=usertest),
             html_body=render_template('email/score_email.html',
                                       user=user, test=test, usertest=usertest))
