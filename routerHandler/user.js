const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/index");
const {jwtSecretKey, expiresIn} = require("../config");
// 注册
exports.register = (request, response) => {
    const { username, password } = request.body;

    const sqlStr = "SELECT * FROM users WHERE username=?";

    pool.query(sqlStr, username, (err, result) => {
        if (err) return response.send({ status: 1, message: err.message });

        if (result.length > 0)  return response.send({ status: 1, message: "用户名已经被占用" });

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const sql = "insert into users set ?";

        pool.query(sql, {username, password: encryptedPassword}, (err, result) => {
            if (err) return response.send({status: 1, message: err.message});
            if (result.affectedRows !== 1) return response.send({status:1, message: "注册用户失败"});

            response.send({status: 0, message: "注册用户成功"});
        });
    });
};

// 登陆
exports.login = (req, res) => {

    const {username, password} = req.body;

    const sql = "SELECT * FROM users where username=?";

    pool.query(sql, username, (err, results) => {

        if (err) return res.send({status: 1, message: err});

        if (results.length !== 1 ) return res.send({status: 1, message: "登陆失败"});

           const compareResult = bcrypt.compareSync(password, results[0].password);

           if (!compareResult) return res.send({status: 1, message: "登陆失败"});

           const user = {...results[0], password: "", user_pic: ""};

           const tokenStr = jwt.sign(user, jwtSecretKey, {expiresIn});
           console.log(tokenStr)

         res.send({
             status: 0,
             message: "登陆成功",
             token: `Bearer ${tokenStr}`
         });
    })

   
}