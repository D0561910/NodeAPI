var rateLimit = require("express-rate-limit");
module.exports = limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10000, // limit each IP to 1000 requests per windowMs
});
