const express = require('express');
const router = express.Router();
const { POST_MODEL } = require('../models/post.model');
const { TAG_MODEL } = require('../models/tag.model');

router.route('/add')
    .get(async (req, res) => {
        let listTag = await TAG_MODEL.find({});
        res.render('add-post', { listTag });
    })
    .post(async (req, res) => {
        const { title, description, tag } = req.body;
        console.log(title, description, tag);


        let newPost = new POST_MODEL({ title, description, tag});
        let infoPostAfterInserted = await newPost.save();

        let infoTagAfterUpdated = await TAG_MODEL.findByIdAndUpdate(tag, {
            $push: {
                post: infoPostAfterInserted._id
            }
        }, {new: true});

        //res.json(infoPostAfterInserted);
        res.redirect('/post/home');
    });

router.get('/home', async (req,res) => {
    let listPost = await POST_MODEL.find();
    res.render('home', { listPost } );
});

router.get('/detail/:postID', async (req, res) => {
    const { postID } = req.params;
    let infoPost = await POST_MODEL.findOne({_id : postID})
        .populate('tag');
    res.render('post-detail', { infoPost });
})

router.get('/:tagTitle', async (req, res) => {
    let { tagTitle } = req.params;
    //console.log(tagTitle);
    let listPostTag = await TAG_MODEL.findOne({title: tagTitle})
        .populate('post');
    //res.json(listPostTag);
    res.render('tag-post', { listPostTag });
})

exports.POST_ROUTER = router;