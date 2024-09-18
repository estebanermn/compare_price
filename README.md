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
