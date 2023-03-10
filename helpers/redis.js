const redis = require("redis");

const redisClient = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

await client.connect();

redisClient.on("connect", () => {
  console.log("Client connected to redis.....!");
});

redisClient.on("ready", () => {
  console.log("Client connected to redis and ready to use.....!");
});

redisClient.on("error", (error) => {
  console.log(error);
});

// Check if the client is still open before executing any Redis commands
if (redisClient.connected) {
  redisClient.get("myKey", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
} else {
  console.log("Redis client is closed.");
}
redisClient.on("end", (error) => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

module.exports = redisClient;
