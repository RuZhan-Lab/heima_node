const joi = require("@hapi/joi");

const name = joi.string().required();
const alias = joi.string().alphanum().required();

exports.add_category_schema = {
    body: {
        name, alias
    }
}