const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const {getArticleCategories, addArticleCategory} = require("../routerHandler/articleCategories");
const {add_category_schema} = require("../schema/articleCategories");

router.get("/categories", getArticleCategories);

router.post("/addCategory", expressJoi(add_category_schema), addArticleCategory)

module.exports = router;