FLASK_APP=microblog.py
FLASK_DEBUG=1
ELASTICSEARCH_URL=http://localhost:9200
SECRET_KEY = bab70adbb6ce4302a03b4769db96db8b
DATABASE_URL=mysql+pymysql://microblog:kumar@localhost:3306/microblog
JSON_ADD_STATUS = False
JSON_DATETIME_FORMAT = '%d/%m/%Y %H:%M:%S'



mysqldump -u root -p microblog > db_backup.sql