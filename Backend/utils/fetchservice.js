const axios = require("axios");
const redis = require("../config/redisClient");

async function fetchFeedData(cacheKey, requestBody, ttl = 600) {
  const url =
    "https://github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com/search";
  try {
    // Check Redis cache
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("Serving from cache:", cacheKey);
        return JSON.parse(cached);
      }
    } catch (redisError) {
      console.warn("Redis unavailable, skipping cache:", redisError.message);
    }

    // Fetch from RapidAPI
    const headers = {
      "x-rapidapi-key":
        process.env.RAPIDAPI_KEY ||
        "fa5bf07b62msh8e2d0348bdb03c1p1f0264jsn926597cdcd5c",
      "x-rapidapi-host":
        "github-profiles-trending-developers-repositories-scrapping.p.rapidapi.com",
      "Content-Type": "application/json",
    };
    console.log("RapidAPI Key:", process.env.RAPIDAPI_KEY);
    console.log("Making API request:", { url, requestBody });
    const response = await axios.post(url, requestBody, { headers });
    const data = response.data;
    console.log("API Response:", data);

    // Cache in Redis
    if (data && typeof data === "object") {
      try {
        await redis.set(cacheKey, JSON.stringify(data), "EX", ttl);
        console.log("Data cached in Redis:", cacheKey);
      } catch (redisError) {
        console.warn("Failed to cache in Redis:", redisError.message);
      }
    } else {
      console.warn("Invalid API response, not caching:", data);
    }

    return data;
  } catch (err) {
    console.error("API Error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      url,
    });
    throw new Error("Failed to fetch data from RapidAPI");
  }
}

module.exports = { fetchFeedData };
