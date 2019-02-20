'''
    user_tests2 = Test.query.join(
            UserTest, (UserTest.test_id == Test.id)).filter(
                UserTest.user_id == current_user.id).all()

    print('printing user_tests as below')
    print(user_tests2)

    for user_test in user_tests2:
        print(user_test)

    q = (db.session.query(UserTest, Test)
    .filter(UserTest.test_id == Test.id)
    .filter(UserTest.user_id == current_user.id)
    .order_by(UserTest.test_taken_on_date.desc()).paginate(
        page, current_app.config['POSTS_PER_PAGE'], False))


    print(q.items)

    for item in q.items:
        print('Hello')
        print(item.UserTest.user_id)

    user_tests = q'''


    alembic.util.exc.CommandError: Target database is not up to date.


    flask db stamp heads



mysql -u root -p < test_physics.sql --force


to run a script on remote mysql : 

mysql -u equizuser -h 172.104.40.65 -p < test_physics.sql --force