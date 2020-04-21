var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");

router.post("/api/login", (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: "test",
        email: "test@gmail.com"
    };

    jwt.sign({
        user
    }, "secretkey", {
        expiresIn: "60m"
    }, (err, token) => {
        res.json({
            token
        });
    });
});

module.exports = router;