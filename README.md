# compare_price

# INSTALL MYSQL

sudo apt update
sudo apt install mysql-server

sudo systemctl status mysql.service
#sudo systemctl start mysql.service
#sudo systemctl stop mysql.service

sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
mysql>exit

#sudo mysql_secure_installation
#write pass root

sudo mysql -u root -p
pass: root

#https://www.youtube.com/watch?v=zRfI79BHf3k

# Connect to a database Mysql / Sqlite

npm install --save mysql2
or
npm install --save sqlite3

To connect to the database, you must create a Sequelize instance. This can be done by either passing the connection parameters separately to the Sequelize constructor or by passing a single connection URI:

const { Sequelize } = require('sequelize');
// Option 1: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
dialect: 'sqlite',
storage: 'path/to/database.sqlite'
});

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
host: 'localhost',
dialect: /_ one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' _/
});

 <!-- tail -f -n 0 /home/estebanermn/my-project/logs/output.log -->
