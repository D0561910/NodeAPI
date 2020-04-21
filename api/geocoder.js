var express = require('express');
var router = express.Router();
var nodeGeocoder = require("node-geocoder");
var jwt = require("jsonwebtoken");
var verifyToken = require("../middleware/verifyJWToken");

router.post("/api/geocoder/coordinate", verifyToken, (request, response) => {
  var lati = `${request.body.latitude}`;
  var long = `${request.body.longitude}`;
  if (lati.trim() === "" || long.trim() === "")
    response.json({ error: "Invaild format !!!" });
  let options = {
    provider: "openstreetmap"
  };

  let geoCoder = nodeGeocoder(options);

  geoCoder
    .reverse({
      lat: lati,
      lon: long
    })
    .then(res => {
      response.json({ res });
    })
    .catch(err => {
      response.json({ err });
    });
});

router.post("/api/geocoder/address", verifyToken, (request, response) => {
  var addr = `${request.body.address}`;
  if (addr.trim() === "") response.json({ error: "Invaild Address !!!" });
  let options = {
    provider: "openstreetmap"
  };

  let geoCoder = nodeGeocoder(options);

  geoCoder
    .geocode(`${addr}`)
    .then(res => {
      response.json({ res });
    })
    .catch(err => {
      response.json({ err });
    });
});

module.exports = router;