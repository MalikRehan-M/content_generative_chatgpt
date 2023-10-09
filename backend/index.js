const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { contentRouter } = require("./routes/content.routes");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/users", userRouter);
// app.use(auth);
// app.use("/genrate-content",contentRouter)
app.post("/gcontent", async (req, res) => {
  //   const token = req.headers.authorization.split(" ")[1];
  console.log("h");
  try {
    // const decoded = jwt.verify(token, "masai");
    const { keyword, content_type } = req.body;
    console.log(req.body);
    const prompt = `Generate a ${content_type} about ${keyword}.`;
    const messages = [
      {
        role: "system",
        content: `You are a ${content_type} generator.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    const generatedContent = response.data.choices[0].message.content;

    res.json({ content_type: generatedContent });
  } catch (error) {

    // console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating content." });
  }
});

app.listen(process.env.port, async () => {
  try {
    
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Cannot connect to DB");
    console.log(err);
  }
  console.log(`Server is running at port ${process.env.port}`);
});
