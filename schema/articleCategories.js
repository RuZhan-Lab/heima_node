const joi = require("@hapi/joi");

const name = joi.string().required();
const alias = joi.string().alphanum().required();

const id = joi.number().integer().min(1).required();

exports.add_category_schema = {
    body: {
        name, alias
    }
};

exports.delete_category_by_id_schema = {
    params: { id }
}

exports.get_category_by_id_schema = {
    params: { id }
}

exports.update_category_schema = {
    body: { id, name, alias }
}