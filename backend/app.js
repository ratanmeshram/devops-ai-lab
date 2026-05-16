const express = require("express");
const app = express();

const client = require("prom-client");
client.collectDefaultMetrics();

// --- YOUR ROUTES ---

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/crash", (req, res) => {
  res.send("Crashing...");
  process.exit(1);
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
});

// --- START SERVER ---
app.listen(5000, () => {
  console.log("Server running on port 5000");
});