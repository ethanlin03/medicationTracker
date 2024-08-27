from flask import Flask, request, jsonify
from flask_cors import CORS
from mysql_constants import Constants
from bs4 import BeautifulSoup
import mysql.connector
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def selectMedicationsOptions():
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        meds = """
            SELECT medicine_name FROM medicines
        """

        cursor.execute(meds)
        valid = cursor.fetchall()

        if valid:
            return valid


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")


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

def getUserPass(username, password):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        query = """
            SELECT first_name, last_name, person_id FROM users WHERE username = %s AND password = %s
        """

        cursor.execute(query, (username, password))
        result = cursor.fetchall()
        print(result)

        if result:
            first = result[0][0]
            last = result[0][1]
            user_id = result[0][2]


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return first, last, user_id

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

def insertUsersMeds(person_id, med_name, amount, dosage, notes, month, day, year):
    msg = "Medicine was already added"

    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        querySelect = """
            SELECT medicine_id FROM medicines WHERE medicine_name = %s;
        """

        queryInsert = """
            INSERT INTO users_medications(medication_id, person_id, medication_name, amount, dosage, notes, month, day, year) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        """

        cursor.execute(querySelect, (med_name,))
        medicine_id = cursor.fetchall()[0][0]

        cursor.execute(queryInsert, (medicine_id, person_id, med_name, amount, dosage, notes, month, day, year))
        msg = "User's medication has been inserted"


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg, medicine_id

def getAddedMeds(person_id):

    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        querySelect = """
            SELECT medication_id, medication_name, amount, dosage, notes, month, day, year FROM users_medications WHERE person_id = %s;
        """

        cursor.execute(querySelect, (person_id,))
        addedMedications = cursor.fetchall()
        return addedMedications

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")


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

@app.route('/homepage', methods=['GET'])
def login_success():

    username = request.args.get('username', type=str)
    password = request.args.get('password', type=str)
    first, last, user_id = getUserPass(username, password)
    response = {'first': first, 'last': last, 'user_id': user_id}

    return jsonify(response), 200

@app.route('/medications', methods=['GET'])
def medication_retrieval():

    medications = selectMedicationsOptions()

    medicines = [item[0].capitalize() for item in medications]

    return jsonify(medicines), 200

@app.route('/medication-insert', methods=['POST'])
def users_medication_insertion():

    data = request.json

    person_id = data.get('person_id')
    med_name = data.get('medication_name')
    amount = data.get('amount')
    dosage = data.get('dosage')
    notes = data.get('notes')
    month = data.get('month')
    day = data.get('day')
    year = data.get('year')
    msg, medicine_id = insertUsersMeds(person_id, med_name, amount, dosage, notes, month, day, year)

    response = {'message': msg, 'medicine_id': medicine_id, 'person_id': person_id}

    return jsonify(response), 200

@app.route('/added-medications', methods=['GET'])
def get_added_medications():

    user_id = request.args.get('userId', type=int)
    print(user_id)
    results = getAddedMeds(user_id)

    response = [
        {
            "id": med[0],
            "medication_name": med[1],
            "amount": med[2],
            "dosage": med[3],
            "notes": med[4],
            "month": med[5],
            "day": med[6],
            "year": med[7]
        }
        for med in results
    ]
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)