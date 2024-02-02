const { Schema, model } = require('mongoose');

const schema = new Schema({
    year: {
        type: Number,
        required: true,
    },
});

module.exports = model('Year', schema);
