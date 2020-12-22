const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const {userInfo, updateUserInfo, updatePassword, updateAvatar} = require("../routerHandler/userInfo");
const {update_password_schema, update_avatar_schema} = require("../schema/user");

router.get("/userInfo", userInfo);

router.post("/userInfo", updateUserInfo);

router.post("/updatePassword", expressJoi(update_password_schema), updatePassword);
router.post("/updateAvatar", expressJoi(update_avatar_schema), updateAvatar);

module.exports = router;