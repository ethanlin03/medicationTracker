#include <stdlib.h>
#include <iostream>

#include "otlv4.h"
using namespace std;

int main() {
    sql::mysql::MySQL_Driver *driver;
    sql::Connection *con;

    driver = sql::mysql::get_mysql_driver_instance();
    con = driver->connect("tcp://127.0.0.1:3306", "root", "2003");

    con->setSchema("your_database_name");

    // Perform database operations, e.g., insert, update, select

    delete con;

    return 0;
}