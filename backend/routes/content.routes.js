const express = require("express");
const contentRouter = express.Router();
const jwt = require("jsonwebtoken");
const { OpenAIApi } = require("openai");
require("dotenv").config();
const axios = require('axios');


contentRouter.post("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("h")
  try {
    const decoded = jwt.verify(token, "masai");
    const { keyword, content_type } = req.body;
    const prompt = `Generate a ${content_type} about ${keyword}.`;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const generatedContent = response.choices[0].text;

    res.json({ content_type: generatedContent });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating content." });
  }
});

module.exports = {
  contentRouter,
};
