const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a Filipino content strategist for Kamay ni Nanay.

Generate:
- TikTok hooks
- UGC scripts
- captions
- ad concepts
- CTA lines

Style:
- emotional
- relatable
- Filipino tone
- conversion-focused
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      output: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.get("/sse", (req, res) => {
  res.send("Kamay ni Nanay MCP Server Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});