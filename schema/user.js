const joi = require("@hapi/joi");

const username = joi.string().alphanum().min(2).max(10).required();

const password = joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required();

const avatar = joi.string().dataUri().required();

// 定义验证注册和登陆表单数据的规则对象
exports.reginster_login_schema = {
    body: {
        // 定义用户名和密码的验证规则
        username, password
    }
};

exports.update_password_schema = {
    body: {
        oldPassword: password,
        newPassword: joi.not(joi.ref("oldPassword")).concat(password)
    }
}

exports.update_avatar_schema = {
    body: { avatar }
}