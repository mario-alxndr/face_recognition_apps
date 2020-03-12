from flask import Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

#Application Config
##################################################################################
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r'/': {"origins":"localhost:8100/login"}})

#Database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'database_skripsi'
mysql = MySQL(app)
##################################################################################

# def application(environ, start_response):
#   if environ['REQUEST_METHOD'] == 'OPTIONS':
#     start_response(
#       '200 OK',
#       [
#         ('Content-Type', 'application/json'),
#         ('Access-Control-Allow-Origin', '*'),
#         ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
#         ('Access-Control-Allow-Methods', 'POST'),
#       ]
#     )
#     return ''

@app.route('/')
def index():
    return 'Hello World'

@app.route('/login',  methods=['POST','OPTIONS'])
def login():
  # print('B')
  # print(request.headers)
  data_user_login = request.form
  print(data_user_login)
  # print('C')
  # print(type(request.form))
  # print(data_user_login['user_name'])
  # print(data_user_login['password'])
  username = data_user_login['user_name']
  password = data_user_login['password']
  # print(username)
  # print('D')
  # print(password)
  cursor = mysql.connection.cursor()
  query = "SELECT * FROM `user` WHERE `user_name` = '" + username + "' AND `password` = '" + password + "'"
  # print('E')
  cursor.execute(query)
  # print('F')
  data_user = cursor.fetchall()
  cursor.close

  if str(data_user) == '()': 
    return 'Username and Password Combination not Found!'

  return 'Login Success'

# @app.route('/login',  methods=['GET'])
# def login():
#   username = request.args.get('user_name')
#   password = request.args.get('password')
#   cursor = mysql.connection.cursor()
#   query = "SELECT * FROM `user` WHERE `user_name` = '" + username + "' AND `password` = '" + password + "'"
#   cursor.execute(query)
#   data_user = cursor.fetchall()
#   cursor.close

#   if str(data_user) == '()': 
#     return 'Username and Password Combination not Found!'

#   return 'Login Success'

@app.route('/absenlist',  methods=['GET', 'POST'])
def absence():
    return 'absenlist'

@app.route('/predict',  methods=['GET', 'POST'])
def predict():
    return 'predict'

if __name__ == "__main__":
    app.run()