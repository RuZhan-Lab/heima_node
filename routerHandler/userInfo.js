const pool = require("../db/index");
const bcrypt = require("bcryptjs");

exports.userInfo = (req, res) => {
    const { id } = req.user;

    const sql = "SELECT id,username,nickname,email,user_pic FROM users WHERE id=?";

    pool.query(sql, id, (err, results) => {
        if (err) return res.send({ state: 1, message: err });
        if (results.length !== 1) return res.send({ state: 1, message: "获取用户失败" });
        res.send({
            state: 0,
            message: "获取用户信息成功",
            data: results[0]
        })
    })
};

exports.updateUserInfo = (req, res) => {

    const sql = "UPDATE users SET ? WHERE id=?";

    pool.query(sql, [req.body, req.user.id], (err, results) => {
        // 执行sql语句失败
        if (err) return res.send({
            state: 1,
            message: err
        });

        if (results.affectedRows !== 1) return res.send({
            state: 1,
            message: "更新数据失败"
        });

        res.send({
            state: 0,
            message: "更新数据成功"
        });
    })
};

exports.updatePassword = (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    const sql = "SELECT * FROM users WHERE id=?";

    pool.query(sql, id, (err, results) => {

        if (err) return res.send({
            state: 1,
            message: err
        });

        if (results.length !== 1) return res.send({
            state: 1,
            message: "用户不存在"
        });

        const compareResult = bcrypt.compareSync(oldPassword, results[0].password);

        if (!compareResult) return res.send({
            state: 1,
            message: "旧密码错误"
        });

        // 定义更新密码的sql语句
        const sql = "UPDATE users SET password=? WHERE id=?";

        const bcryptedPassword = bcrypt.hashSync(newPassword, 10);

        pool.query(sql, [bcryptedPassword, id], (err, results) => {
            if (err) return res.send({ state: 1, message: err });
            if (results.affectedRows !== 1) return res.send({ state: 1, message: "更新密码失败" });

            res.send({
                state: 0,
                message: "修改密码成功"
            })
        });
    })
}

exports.updateAvatar = (req, res) => {
    const {avatar} = req.body;
    const {id} = req.user;

    const sql = "UPDATE users SET user_pic=? WHERE id=?";

    pool.query(sql, [avatar, id], (err, results) => {
        if (err) return res.send({state: 1, message: err});
        if (results.affectedRows !== 1) return res.send({state: 1, message: "更换头像失败"});

        res.send({state: 0, message: "更换头像成功"});
    });
}
