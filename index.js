const express = require("express");
const cors = require("cors");
const Joi = require("@hapi/joi");
const expressJwt = require("express-jwt");
const app = express();

const {jwtSecretKey} = require("./config");
const usersRouter = require("./router/user");
const userInfoRouter = require("./router/userInfo");
const categories = require("./router/articleCategories");
const article = require("./router/article");

app.use(expressJwt({secret: jwtSecretKey, algorithms: ["HS256"]}).unless({path: /^\/api/}));
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static("./uploads"));
app.use("/api", usersRouter);
app.use("/my", userInfoRouter);
app.use("/my/article", categories);
app.use("/my/article", article);

app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof Joi.ValidationError) {
       return res.send({
            status: 1,
            message: err.message
        });
    };
// 身份认证失败
    if (err.name === "UnauthorizedError") return res.send({
        status: 1,
        message: "身份认证失败"
    });

    res.send({
        status: 1,
        message: "未知错误"
    });
});


app.listen(3007, () => {
    console.log("Port is on 3007");
});