var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var verifyToken = require("../middleware/verifyJWToken");

router.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created...",
                authData
            });
        }
    });
});

module.exports = router;