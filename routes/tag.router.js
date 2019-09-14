const express = require('express');
const router = express.Router();
const { TAG_MODEL } = require('../models/tag.model');

router.route('/add')
    .post(async (req, res) => {
        const { title} = req.body;
        console.log(title);

        let newTag = new TAG_MODEL({ title });
        let infoTagAfterInserted = await newTag.save();

        res.json(infoTagAfterInserted);
    });

exports.TAG_ROUTER = router;