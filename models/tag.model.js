let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let tagSchema = new Schema({
    title: String,
    post: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

let Tag = mongoose.model('tag', tagSchema);
exports.TAG_MODEL = Tag;