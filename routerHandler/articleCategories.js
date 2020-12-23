const pool = require("../db/index");

exports.getArticleCategories = (req, res) => {

    const sql = "SELECT * FROM article_category WHERE is_delete=0 ORDER BY id ASC";

    pool.query(sql, (err, results) => {
        if (err) return res.send({ state: 0, message: err });

        res.send({ state: 0, message: "获取文章分类成功", data: results });
    });
};

exports.addArticleCategory = (req, res) => {
    const {name, alias} = req.body;
    const sql = "SELECT * FROM article_category WHERE name=? OR alias=?";

    pool.query(sql, [name, alias], (err, results) => {
        if (err) return res.send({state: 1, message: err});
        if (results.length === 2) return res.send({state: 1, message: "分类名或别名被占用， 请更换后重试"});
        if (results.length === 1 && results[0].name === name && results[0].alias === alias) return res.send({state: 1, message: "分类名和别名被占用， 请更换后重试"});
        if (results.length === 1 && results[0].alias === alias)  return res.send({state: 1, message: "分类别名被占用， 请更换后重试"});

        // 定义插入文章的sql
        const sql = "INSERT INTO article_category SET ?";

        pool.query(sql, {name, alias}, (err, results) => {
            if (err) return res.send({state: 1, message: err});
            if (results.affectedRows !== 1) return res.send({state: 1, message: "新增文章失败"});

            res.send({state: 0, message: "新增文章成功"});

        })
    });
}

exports.deleteArticleCategoryById = (req, res) => {

    const sql = "UPDATE article_categories SET is_delete=1 WHERE id=?";

    pool.query(sql, req.params.id, (err, results) => {
        if (err) return res.send({state: 1, message: err});
        if (results.effectedRows !== 1) return res.send({state: 1, message: "删除文章失败"});
        res.send({state: 0, message: "删除文章成功"});
    });
}

exports.getArticleCategoriesById = (req, res) => {

    const sql = "SELECT * FROM article_categories WHERE id=?";

    pool.query(sql, req.params.id, (err, results) => {
        if (err) return res.send({state: 1, message: err});

        if (results.length !== 1) return res.send({state: 1, message: "获取文章分类数据失败"});
        res.send({
            state: 0,
            message: "获取文章分类成功",
            data: results[0]
        })
    })

    res.send("getArticleCategoriesById");
}

exports.updateCategoryById = (req, res) => {

    const {id, name, alias} = req.body;

    const sql = "SELECT * FROM article_category WHERE Id<>? AND (name=? OR alias=?)";

    pool.query(sql, [id, name, alias], (err, results) => {
        if (err) return res.send({state: 1, message: err});
        if (results.length === 2) return res.send({state: 1, message: "分类名或别名被占用， 请更换后重试"});
        if (results.length === 1 && results[0].name === name && results[0].alias === alias) return res.send({state: 1, message: "分类名和别名被占用， 请更换后重试"});
        if (results.length === 1 && results[0].alias === alias)  return res.send({state: 1, message: "分类别名被占用， 请更换后重试"});
         
        const sql = "UPDATE article_category SET ? WHERE Id=?";

        pool.query(sql, [{id, name, alias}, id], (err, results) => {
            if (err) return res.send({state: 1, message: err});
            if (results.affectedRows !== 1) return res.send({state: 1, message: "更新文章失败"});
            res.send({state: 1, message: "更新文章成功"});
        })
    });

   
}