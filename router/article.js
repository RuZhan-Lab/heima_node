const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const expressJoi = require("@escook/express-joi");
const {add_article_schema} = require("../schema/article");
const {addArticle} = require("../routerHandler/article");

const uploads = multer({dest: path.join(__dirname, "../uploads")});

router.post("/add",uploads.single("cover_img"), expressJoi(add_article_schema), addArticle);

module.exports = router;