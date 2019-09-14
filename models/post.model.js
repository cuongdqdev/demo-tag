let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    title: String,
    description: String,
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }     
});

let Post = mongoose.model('post', postSchema);
exports.POST_MODEL = Post;
