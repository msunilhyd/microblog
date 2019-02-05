from datetime import datetime
from flask import render_template, flash, redirect, url_for, request, \
    jsonify, current_app
from flask_login import current_user, login_required
from app import db
from app.main.forms import EditProfileForm, PostForm
from app.models import User, Post, UserTest, Test
from app.main import bp


@bp.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(body=form.post.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post is now live!', 'info')
        return redirect(url_for('main.index'))
    page = request.args.get('page', 1, type=int)
    
    # Currently hiding the user_test activity
    #posts = current_user.user_tests().paginate(page, current_app.config['POSTS_PER_PAGE'], False)
    posts = Post.query.order_by(Post.timestamp.desc()).paginate(
        page, current_app.config['POSTS_PER_PAGE'], False)    
    next_url = url_for('main.index', page=posts.next_num) \
            if posts.has_next else None
    prev_url = url_for('main.index', page=posts.prev_num) \
            if posts.has_prev else None
    return render_template('index.html', title='Home Page', form=form, posts=posts.items, next_url=next_url, prev_url=prev_url)



@bp.route('/explore')
@login_required
def explore():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.timestamp.desc()).paginate(
        page, current_app.config['POSTS_PER_PAGE'], False)
    next_url = url_for('main.explore', page=posts.next_num) \
        if posts.has_next else None
    prev_url = url_for('main.explore', page=posts.prev_num) \
        if posts.has_prev else None
    return render_template('index.html', title='Explore',
                           posts=posts.items, next_url=next_url,
                           prev_url=prev_url)


@bp.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    posts = user.posts.order_by(Post.timestamp.desc()).paginate(
        page, current_app.config['POSTS_PER_PAGE'], False)
    user_tests = UserTest.query.filter_by(user_id=current_user.id).order_by(UserTest.test_taken_on_date.desc()).paginate(
        page, current_app.config['POSTS_PER_PAGE'], False)
   
    next_url = url_for('main.user', username=user.username,
                       page=user_tests.next_num) if user_tests.has_next else None
    prev_url = url_for('main.user', username=user.username,
                       page=user_tests.prev_num) if user_tests.has_prev else None
    return render_template('user.html', user=user, posts=user_tests.items,
                           next_url=next_url, prev_url=prev_url)


@bp.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        if form.picture.data:
            current_user.image_file = save_profile_picture(form.picture.data)
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('Your changes have been saved', 'info')
        return redirect(url_for('main.edit_profile'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile',
                           form=form)


def save_profile_picture(form_picture):
	random_hex = secrets.token_hex(8)
	_, f_ext = os.path.splitext(form_picture.filename)
	picture_fn = random_hex + f_ext
	picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)
	form_picture.save(picture_path)

	return picture_fn


@bp.route('/follow/<username>')
@login_required
def follow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('User {} not found'.format(username), 'danger')
        return redirect(url_for('main.index'))
    if user == current_user:
        flash('You cannot follow yourself!', 'warning')
        return redirect(url_for('main.user', username=username))
    current_user.follow(user)
    db.session.commit()
    flash('You are now following {} !'.format(username), 'info')
    return redirect(url_for('main.user', username=username))


@bp.route('/unfollow/<username>')
@login_required
def unfollow(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        flash('User {} not found.'.format(username), 'danger')
        return redirect(url_for('main.index'))
    if user == current_user:
        flash('You cannot unfollow yourself!', 'danger')
        return redirect(url_for('main.user', username=username))
    current_user.unfollow(user)
    db.session.commit()
    flash('You are now not following {}.'.format(username), 'info')
    return redirect(url_for('main.user', username=username))
