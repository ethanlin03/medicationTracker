import requests
import mysql.connector
from bs4 import BeautifulSoup
from Projects.medicationProject.backend.mysql_constants import Constants

page_url = 'https://www.webmd.com/drugs/2/index'

def parse_webpage(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        page_content = BeautifulSoup(response.content, 'html.parser')

        all_drugs = page_content.find_all('li', class_ = 'list-items')
        if all_drugs:
            for drug in all_drugs:
                drug_name = drug.find('a', class_='common-drug-name')
                if drug_name:
                    insert_SQL(drug_name.get_text())

        else:
            print("error")

        print("Inserted all medicines")

    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")


def insert_SQL(drug_name):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        insert_statement = """INSERT IGNORE INTO medicines (medicine_name) VALUES (%s);"""

        cursor.execute(insert_statement, (drug_name,))

    except mysql.connector.Error as error:
        print("Medicine already exists")

    finally:
        connection.commit()
        cursor.close()
        connection.close()

parse_webpage(page_url)