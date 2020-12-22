const express = require("express");

const router = express.Router();

const expressJoi = require("@escook/express-joi");

const {reginster_login_schema} = require("../schema/user");

const {register, login} = require("../routerHandler/user");

router.post("/register", expressJoi(reginster_login_schema), register);

router.post("/login", expressJoi(reginster_login_schema), login);

module.exports = router;