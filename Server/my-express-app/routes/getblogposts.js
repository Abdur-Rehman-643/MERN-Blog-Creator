var express = require('express');
var router = express.Router();
const connection = require("../database/sql");

router.get('/', function (req, res, next) {
    var query = `
        SELECT id, title, content, published_at, coverImage 
        FROM articles`;

    connection.query(query, function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).send('Error occurred while retrieving data.');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
