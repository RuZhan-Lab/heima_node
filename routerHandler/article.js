const path = require("path");
const pool = require("../db/index");

exports.addArticle = (req, res) => {


    if (!req.file || req.file.fieldname !== "cover_img") return res.send({ state: 1, message: "文章封面是必选参数" });

    const articleInfo = {
        ...req.body,
        cover_img: path.join("/uploads", req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    const sql = "INSERT INTO articles SET ?";

    pool.query(sql, articleInfo, (err, results) => {
        if (err) return res.send({ state: 1, message: err });
        if (results.affectedRows !== 1) return res.send({ state: 1, message: "发布文章失败" });

        res.send({ state: 0, message: "发布文章成功" });
    })

}