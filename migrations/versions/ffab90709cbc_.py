"""empty message

Revision ID: ffab90709cbc
Revises: 
Create Date: 2019-02-13 04:12:51.916082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffab90709cbc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('department',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employee',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('hired_on', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('section', sa.String(length=100), nullable=False),
    sa.Column('question_content', sa.String(length=500), nullable=False),
    sa.Column('question_image', sa.String(length=100), nullable=True),
    sa.Column('a', sa.String(length=100), nullable=False),
    sa.Column('b', sa.String(length=100), nullable=False),
    sa.Column('c', sa.String(length=100), nullable=False),
    sa.Column('d', sa.String(length=100), nullable=False),
    sa.Column('ans', sa.String(length=100), nullable=False),
    sa.Column('positive_marks', sa.Integer(), nullable=False),
    sa.Column('negative_marks', sa.Integer(), nullable=False),
    sa.Column('sub_section', sa.String(length=100), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.Column('date_posted', sa.DateTime(timezone=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('is_admin', sa.Integer(), nullable=False),
    sa.Column('is_confirmed', sa.Integer(), nullable=False),
    sa.Column('about_me', sa.Text(), nullable=True),
    sa.Column('last_seen', sa.DateTime(), nullable=True),
    sa.Column('image_file', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('department_employee_link',
    sa.Column('department_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('extra_data', sa.String(length=256), nullable=True),
    sa.ForeignKeyConstraint(['department_id'], ['department.id'], ),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.PrimaryKeyConstraint('department_id', 'employee_id')
    )
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['user.id'], )
    )
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=140), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_post_timestamp'), 'post', ['timestamp'], unique=False)
    op.create_table('test',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('test_name', sa.String(length=50), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=True),
    sa.Column('instructions', sa.String(length=1000), nullable=False),
    sa.Column('total_no_of_questions', sa.Integer(), nullable=False),
    sa.Column('no_of_questions_maths', sa.Integer(), nullable=False),
    sa.Column('no_of_questions_physics', sa.Integer(), nullable=False),
    sa.Column('no_of_questions_chemistry', sa.Integer(), nullable=False),
    sa.Column('total_marks', sa.Integer(), nullable=False),
    sa.Column('marks_maths', sa.Integer(), nullable=False),
    sa.Column('marks_physics', sa.Integer(), nullable=False),
    sa.Column('marks_chemistry', sa.Integer(), nullable=False),
    sa.Column('time_in_mins', sa.Integer(), nullable=False),
    sa.Column('author_maths', sa.String(length=120), nullable=True),
    sa.Column('author_physics', sa.String(length=120), nullable=True),
    sa.Column('author_chemistry', sa.String(length=120), nullable=True),
    sa.Column('date_posted', sa.DateTime(timezone=True), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('test_question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('test_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['question.id'], ),
    sa.ForeignKeyConstraint(['test_id'], ['test.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_test',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('test_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('user_score', sa.Integer(), nullable=False),
    sa.Column('positive_score', sa.Integer(), nullable=False),
    sa.Column('negative_score', sa.Integer(), nullable=False),
    sa.Column('correct_answers', sa.Integer(), nullable=False),
    sa.Column('wrong_answers', sa.Integer(), nullable=False),
    sa.Column('no_answers', sa.Integer(), nullable=False),
    sa.Column('attempted_ques', sa.Integer(), nullable=False),
    sa.Column('total_score_maths', sa.Integer(), nullable=False),
    sa.Column('total_score_physics', sa.Integer(), nullable=False),
    sa.Column('total_score_chemistry', sa.Integer(), nullable=False),
    sa.Column('positive_score_maths', sa.Integer(), nullable=False),
    sa.Column('positive_score_physics', sa.Integer(), nullable=False),
    sa.Column('positive_score_chemistry', sa.Integer(), nullable=False),
    sa.Column('negative_score_maths', sa.Integer(), nullable=False),
    sa.Column('negative_score_physics', sa.Integer(), nullable=False),
    sa.Column('negative_score_chemistry', sa.Integer(), nullable=False),
    sa.Column('attempted_maths', sa.Integer(), nullable=False),
    sa.Column('attempted_physics', sa.Integer(), nullable=False),
    sa.Column('attempted_chemistry', sa.Integer(), nullable=False),
    sa.Column('un_attempted_maths', sa.Integer(), nullable=False),
    sa.Column('un_attempted_physics', sa.Integer(), nullable=False),
    sa.Column('un_attempted_chemistry', sa.Integer(), nullable=False),
    sa.Column('correct_attempted_maths', sa.Integer(), nullable=False),
    sa.Column('correct_attempted_physics', sa.Integer(), nullable=False),
    sa.Column('correct_attempted_chemistry', sa.Integer(), nullable=False),
    sa.Column('wrong_attempted_maths', sa.Integer(), nullable=False),
    sa.Column('wrong_attempted_physics', sa.Integer(), nullable=False),
    sa.Column('wrong_attempted_chemistry', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['test_id'], ['test.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('test_id', 'user_id')
    )
    op.create_index(op.f('ix_user_test_timestamp'), 'user_test', ['timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_test_timestamp'), table_name='user_test')
    op.drop_table('user_test')
    op.drop_table('test_question')
    op.drop_table('test')
    op.drop_index(op.f('ix_post_timestamp'), table_name='post')
    op.drop_table('post')
    op.drop_table('followers')
    op.drop_table('department_employee_link')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('question')
    op.drop_table('employee')
    op.drop_table('department')
    # ### end Alembic commands ###
