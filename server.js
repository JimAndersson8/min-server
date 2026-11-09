import express from "express";

const app = express();
const port = 3001;

app.get("/hej", (req, res) => {
  res.send("Hej från min server!");
});

app.get("/hej/:Jim", (req, res) => {
  res.send(`Hej ${req.params.Jim}!`);
});

app.get("/tid", (req, res) => {
  res.send(new Date().toLocaleTimeString("sv-SE"));
});

app.get("/om", (req, res) => {
  res.json({ namn: "Jim", yrke: "Webbutvecklare" });
});

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});