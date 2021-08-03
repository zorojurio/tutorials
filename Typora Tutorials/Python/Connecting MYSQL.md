## Connecting MYSQL

```python
import mysql.connector                                                                        
                                                                                              
my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101")           
                                                                                              
if my_db:                                                                                     
    print("connection successful")                                                            
else:                                                                                         
    print("connection unsuccessful")                                                          
```

## Creating a Database

```python
import mysql.connector                                                                               
my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101")                   
if my_db:                                                                                             
    print("connection successful")                                                                   
else:                                                                                                 
    print("connection unsuccessful")                                                                  
my_curser = my_db.cursor() # in order to execute queries cursor is used                                                                          
my_curser.execute("CREATE DATABASE chandb")                                                               
```

## Showing all the databases

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101")

if my_db:
    print("connection successful")
else:
    print("connection unsuccessful")

my_curser = my_db.cursor()
my_curser.execute("SHOW DATABASES")

for db in my_curser:
    print(db)
```

![image-20201020182621883](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201020182621883.png)

## Creating Tables

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101")
my_db.database = "chandb" # can add the database

if my_db:
    print("connection successful")
else:
    print("connection unsuccessful")

my_curser = my_db.cursor()
my_curser.execute('CREATE TABLE employee(name varchar(200), sal int(20))')

```

## Showing all the tables in a database

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101")
my_db.database = "chandb"

if my_db:
    print("connection successful")
else:
    print("connection unsuccessful")

my_curser = my_db.cursor()
my_curser.execute('SHOW TABLES')

for table in my_curser:
    print(table)

```

## populating data in to the database

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101", database="chandb")

my_cursor = my_db.cursor()
sql_form = "INSERT INTO employee (name,sal) values(%s,%s)"
employees = [("chanuka", 2000), ("hiruni", 1000), ("kaveeetha", 2500),]

my_cursor.executemany(sql_form, employees)
my_db.commit()  # saving the data to the database

```

## Getting the first row

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101", database="chandb")
my_cursor = my_db.cursor()
my_cursor.execute("select * from employee")

result = my_cursor.fetchone()
print(result)

for row in result:
    print(row)
```

![image-20201020192223063](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201020192223063.png)

## Getting all the information

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101", database="chandb")
my_cursor = my_db.cursor()
my_cursor.execute("select * from employee")

result = my_cursor.fetchall()

for row in result:
    print(row)
```

![image-20201020192434751](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201020192434751.png)

## Update the table

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101", database="chandb")
my_cursor = my_db.cursor()

sql = "UPDATE employee set sal=70000 where name='hiruni'"
my_cursor.execute(sql)
my_db.commit()
```

## Deleting a data from the database

```python
import mysql.connector

my_db = mysql.connector.connect(host="localhost", user="root", passwd="luffy@5101", database="chandb")
my_cursor = my_db.cursor()

sql = "DELETE FROM employee WHERE name='chanuka'"
my_cursor.execute(sql)
my_db.commit()
```



