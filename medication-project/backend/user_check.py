from flask import Flask, request, jsonify
from flask_cors import CORS
from mysql_constants import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def checkUser(username, password):
    msg = "Incorrect username/password."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        passCheck = """
            SELECT person_id FROM users WHERE username = %s AND password = %s
        """

        cursor.execute(passCheck, (username, password))
        valid = cursor.fetchall()

        if valid:
            print("Valid password")
            msg = "Login successful."
        else:
            print("Wrong password")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def insertUser(username, password, first, last):
    msg = "User already exists."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        createTable = """
            CREATE TABLE IF NOT EXISTS users (
            person_id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) UNIQUE,
            password VARCHAR(255), 
            first_name VARCHAR(255),
            last_name VARCHAR(255)
            );
        """

        cursor.execute(createTable)

        insertLogin = """
            INSERT INTO users(username, password, first_name, last_name) VALUES (%s, %s, %s, %s);
        """

        cursor.execute(insertLogin, (username, password, first, last))
        msg = "User created"

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

@app.route('/signup-form', methods=['POST'])
def signup_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    first = data.get('first_name')
    last = data.get('last_name')
    # Process the data, save to database, etc.
    msg = insertUser(username, password, first, last)
    
    # Return a response (optional)
    response = {'message': msg, 'first': first, 'last': last}
    print(msg)

    return jsonify(response), 200

@app.route('/login-form', methods=['POST'])
def login_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    # Process the data, save to database, etc.
    msg = checkUser(username, password)
    
    # Return a response (optional)
    response = {'message': msg, 'username': username, 'password': password}
    print(msg)

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)