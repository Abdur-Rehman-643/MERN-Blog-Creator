const express = require('express');
const router = express.Router();
const connection = require('../database/sql');

router.get('/:id', function (req, res, next) {
    const blogId = req.params.id;

    const query = `
        SELECT id, title, content, published_at, coverImage 
        FROM articles 
        WHERE id = ?`;

    connection.query(query, [blogId], function (err, results) {
        if (err) {
            console.error('SQL Error:', err.message);
            console.error('SQL Query:', query);
            console.error('Query Parameters:', [blogId]);
            return res.status(500).send('Error occurred while retrieving data.');
        }
        if (results.length === 0) {
            return res.status(404).send('Blog post not found.');
        }
        res.json(results[0]);
    });
});

module.exports = router;
