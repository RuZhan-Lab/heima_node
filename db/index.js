const mysql = require("mysql");

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    database: "big_events",
    password: "ruzhan34128119"
});

module.exports = pool;


/**
 * ConnectionError [SequelizeConnectionError]: Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * 解决方法如下：

 通过命令行进入解压的mysql根目录下。
 登陆数据库
 mysql -uroot -p
 输入root的密码
 Enter password: ******
 更改加密方式（原样拷贝到命令窗中）
 mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
 更改密码：该例子中 123456为新密码
 mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
 刷新：
 mysql> FLUSH PRIVILEGES;
 */




