const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mysecret";   // simple secret
let students = [
  { id: 1, name: "vikas", sec: "cse" },
  { id: 2, name: "sai", sec: "ece" }
];

// PUBLIC: login → returns token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ user: "admin" }, SECRET, { expiresIn: "1h" });
    return res.json(token);
  }
  res.status(401).send("Invalid login");
});
// Middleware to verify token
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("Token missing");
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
}

// PROTECTED: read all students
app.get("/students", auth, (req, res) => {
  res.json(students);
});

// PROTECTED: add student
app.post("/students", auth, (req, res) => {
  students.push(req.body);
  res.json(students);
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));