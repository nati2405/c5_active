const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let emails = [];

app.post("/signup", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  emails.push(email);
  console.log("New signup:", email);

  res.status(200).json({ message: "Signed up successfully" });
});

app.get("/signups", (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
