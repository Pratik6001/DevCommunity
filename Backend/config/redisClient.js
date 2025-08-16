const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: "E14IqHgwDktn18rATV1cTa9X2uzonywP",
  socket: {
    host: "redis-11459.c267.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 11459,
  },
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
