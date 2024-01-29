const { Schema, model } = require('mongoose');

const schema = new Schema({
    year: { type: Number, required: true },
    title: { type: String, required: true },
    disabled: { type: Boolean, required: true },
    url: { type: String },
    img: { type: String },
    content: [
        { text: { type: String }, page: { type: Number } },
    ]
});

module.exports = model('Journal', schema);