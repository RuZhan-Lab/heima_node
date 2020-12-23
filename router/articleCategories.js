const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const {
    getArticleCategories, 
    addArticleCategory, 
    deleteArticleCategoryById, 
    getArticleCategoriesById,
    updateCategoryById
} = require("../routerHandler/articleCategories");
const {
    add_category_schema, 
    delete_category_by_id_schema, 
    get_category_by_id_schema,
    update_category_schema
} = require("../schema/articleCategories");

router.get("/categories", getArticleCategories);

router.post("/addCategory", expressJoi(add_category_schema), addArticleCategory)

router.get("/deleteCategory/:id", expressJoi(delete_category_by_id_schema), deleteArticleCategoryById);

router.get("/categories/:id", expressJoi(get_category_by_id_schema), getArticleCategoriesById);

router.post("/updateCategory", expressJoi(update_category_schema), updateCategoryById);

module.exports = router;