const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL, // REDIS_URL = rediss://default:<password>@host:port
});

client.on("error", (err) => console.log("Redis Client Error", err));

async function connectRedis() {
  try {
    await client.connect();
    console.log("Redis connected");

    // Optional test key
    await client.set("foo", "bar", { EX: 10 });
    const result = await client.get("foo");
    console.log("Test value from Redis:", result); // should print "bar"
  } catch (err) {
    console.error("Failed to connect Redis:", err.message);
  }
}

connectRedis();

module.exports = client;
