import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// In-memory DB (just for demo)
let users = [];
let refreshTokens = [];

// Generate Access Token
function createAccessToken(user) {
  return jwt.sign({ username: user.username }, process.env.ACCESS_SECRET, {
    expiresIn: "10m",
  });
}

// Generate Refresh Token
function createRefreshToken(user) {
  const token = jwt.sign({ username: user.username }, process.env.REFRESH_SECRET);
  refreshTokens.push(token);
  return token;
}

// ---------- REGISTER ----------
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });

  res.json({ message: "User Registered!" });
});

// ---------- LOGIN ----------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  res.json({ accessToken, refreshToken });
});

// ---------- TOKEN REFRESH ----------
app.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.status(403).json({ error: "Refresh token invalid" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = createAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

// ---------- LOGOUT ----------
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.json({ message: "Logged out" });
});

// ---------- PROTECTED ENDPOINT ----------
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}

app.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

// Start Server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
