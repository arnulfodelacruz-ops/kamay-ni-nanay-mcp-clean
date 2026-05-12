import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Kamay ni Nanay MCP Server Running");
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  res.write(
    `data: ${JSON.stringify({
      type: "message",
      content: "Kamay ni Nanay MCP Connected",
    })}\n\n`
  );

  const interval = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 30000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});