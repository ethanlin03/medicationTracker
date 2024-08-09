from flask import Flask, request, jsonify
from flask_cors import CORS
from mysql_constants import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000/"}}) # allows localhost to access the flask server

def insertUser(first, last):
    msg = "User already exists."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        createTable = """
            CREATE TABLE IF NOT EXISTS people (
            person_id INT PRIMARY KEY AUTO_INCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255)
            );
        """

        cursor.execute(createTable)

        insertLogin = """
            INSERT INTO people(first_name, last_name) VALUES (%s, %s);
        """

        cursor.execute(insertLogin, (first, last))
        msg = "Success"

    except mysql.connector.Error as error:
        print("Error occured: ", error)

        
    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

@app.route('/form', methods=['POST'])
def form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    first = data.get('first_name')
    last = data.get('last_name')
    # Process the data, save to database, etc.
    msg = insertUser(first, last)
    
    # Return a response (optional)
    response = {'message': msg, 'first': first, 'last': last}
    print(msg)

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)