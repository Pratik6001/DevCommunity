// middleware/rateLimiter.js
const redis = require("../config/redisClient");

const rateLimiter = (limit = 100, windowInSeconds = 60) => {
  return async (req, res, next) => {
    try {
      const identifier = req.ip; // you can also use req.user.id if authenticated
      const key = `rate:${identifier}`;

      const current = await redis.incr(key);

      if (current === 1) {
        // first request, set expiry
        await redis.expire(key, windowInSeconds);
      }

      if (current > limit) {
        return res.status(429).json({
          message: `Rate limit exceeded. Try again in ${windowInSeconds} seconds.`,
        });
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      next(); // allow request if Redis fails
    }
  };
};

module.exports = rateLimiter;
