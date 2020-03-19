from flask import Flask, request
import json
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)

#Application Config
##################################################################################
# config = {
#   'ORIGINS': [
#     'http://localhost:8100',
#     'http://127.0.0.1:8100',
#   ],
# }

# App
app = Flask('Test')
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

# Database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'database_skripsi'
mysql = MySQL(app)
##################################################################################

@app.route('/')
def index():
  return 'Hello World'

@app.route('/login', methods=['POST','OPTIONS'])
@cross_origin()
def login():
  data_user_login = request.get_json()

  username = data_user_login['user_name']
  password = data_user_login['password']

  cursor = mysql.connection.cursor()
  query = "SELECT * FROM user WHERE user_name = '" + username + "' AND password = '" + password + "'"
  cursor.execute(query)
  data_user = cursor.fetchall()
  cursor.close

  if str(data_user) == '()':
    return 'Username and Password Combination not Found!'

  return 'Login Success'

@app.route('/absenlist', methods=['GET', 'POST'])
def absence():
  return 'absenlist'

@app.route('/predict', methods=['GET', 'POST'])
def predict():
  return 'predict'

if __name__ == "__main__":
  app.run()