var express = require('express');
var router = express.Router();
const multer = require('multer');
const connection = require("../database/sql");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('coverImage'), function (req, res) {
    const { title, content } = req.body;
    const coverImage = req.file ? req.file.filename : null;
    const publishedAt = new Date().toISOString().split('T')[0];

    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Cover Image:", coverImage);
    console.log("Published At:", publishedAt);

    const query = `
        INSERT INTO articles (title, content, published_at, coverImage) 
        VALUES (?, ?, ?, ?)`;

    connection.query(query, [title, content, publishedAt, coverImage], function (err) {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).send('Error occurred while inserting data.');
        }
        res.status(200).json({ message: 'Blog post created successfully', redirectUrl: '/' });
    });
});


module.exports = router;