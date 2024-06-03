const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const OpenAI = require("openai");
const PORT = 5001;

const app = express();

require("dotenv").config();

app.use(express.json());

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mysql database");
});

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"],
  })
);

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  con.query(checkEmailSql, [email], function (err, result) {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).send("Error checking email");
    }
    console.log(result.length);

    const emailExists = result.length > 0;
    if (emailExists) {
      console.log("Email already exists");
      return res.status(400).send("Email already exists");
    } else {
      const signUpSql = "INSERT INTO users (email, password) VALUES (?,?)";
      con.query(signUpSql, [email, password], function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).send("Error signing up");
        }

        const data = {
          userid: result.insertId,
        };

        console.log("sign up success");
        res.status(200).json(data);
      });
    }
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const checkUserSql = "SELECT * FROM users WHERE email = ? AND password = ?";
  con.query(checkUserSql, [email, password], (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).send("Error signing in");
    }

    if (result.length === 0) {
      console.log("Invalid email or password");
      return res.status(401).send("Invalid email or password");
    }
    console.log(result[0].userid);
    const data = {
      userid: result[0].userid,
    };
    console.log("Sign in success");
    res.status(200).json(data);
  });
});

app.post("/editprofile", (req, res) => {
  const { id, name, age, username } = req.body;
  const editProfileSql =
    "UPDATE users SET name = ?, age = ?, username = ? WHERE userid = ?";
  con.query(editProfileSql, [name, age, username, id], (err, result) => {
    if (err) {
      console.error("Error editing profile:", err);
      return res.status(500).send("Error editing profile");
    }

    console.log("edit success");
    res.status(200).send("edit successfully");
  });
});

app.post("/profile", (req, res) => {
  const { id } = req.body;
  const getProfileSql = "SELECT * FROM users WHERE userid = ?";
  con.query(getProfileSql, [id], (err, result) => {
    if (err) {
      console.error("Error getting profile:", err);
      return res.status(500).send("Error getting profile");
    }

    const userData = {
      name: result[0].name,
      username: result[0].username,
      age: result[0].age,
      email: result[0].email,
    };

    console.log("profile retrived");
    res.status(200).json(userData);
  });
});

app.post("/getchat", (req, res) => {
  const { id } = req.body;
  const getChatSql = "SELECT * FROM chats WHERE userid = ?";
  con.query(getChatSql, [id], (err, result) => {
    if (err) {
      console.error("Error getting chat:", err);
      return res.status(500).send("Error getting chat");
    }
    console.log(result);
    console.log("chat history retrived");
    res.status(200).json(result);
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post("/chat", async (req, res) => {
  const { id, qn } = req.body;
  console.log("id: " + id + " qn: " + qn);

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `Be my baby assistant. Answer this question: ${qn}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const generatedText = completion.choices[0].message.content;

    //await sleep(3000);
    //const generatedText = "GPT ANSWER DEMO"; // delete when using api
    console.log("Generated completion:", generatedText);
    const dateTime = new Date();
    const dateTimeFormatted = dateTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const addChatSql =
      "INSERT INTO chats (userid, question, answer, timestamp) VALUES (?,?,?,?)";
    con.query(
      addChatSql,
      [id, qn, generatedText, dateTimeFormatted],
      (err, result) => {
        if (err) {
          console.error("Error adding chat to mysql: ", err);
          return res.status(500).send("Error adding chat to mysql");
        }
      }
    );
    console.log("chat added to mysql");

    res.status(200).send(generatedText);
  } catch (error) {
    console.error("gpt 3.5 Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
