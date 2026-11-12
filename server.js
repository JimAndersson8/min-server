import express from "express";
import cors from "cors";
import { projekt } from "./projekt.js";

const app = express();
app.use(cors());

// Logger-middleware körs före routes och skriver ut varje inkommande anrop.
app.use((req, res, next) => {
  console.log(new Date().toLocaleTimeString("sv-SE"), req.method, req.url);
  next();
});

const port = 3001;

app.get("/hej", (req, res) => {
  res.json({
    meddelande: "Hej från min server!",
    namn: "Jim",
    roll: "Webbutvecklare",
    intressen: ["React", "JavaScript", "bygga webbsidor"],
  });
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

app.get("/projekt", (req, res) => {
  res.json(projekt);
});

// DELETE tar bort projektet ur listan som ligger i serverns minne.
app.delete("/projekt/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = projekt.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ fel: "Projektet finns inte" });
  }

  projekt.splice(index, 1);
  // 204 betyder att borttagningen lyckades och inget svarsinnehåll behövs.
  res.status(204).end();
});

app.get("/projekt/teknik/:namn", (req, res) => {
  const namn = req.params.namn.toLowerCase();
  const hittade = projekt.filter((p) =>
    p.teknik.some((teknik) => teknik.toLowerCase() === namn),
  );

  res.json(hittade);
});

app.get("/projekt/:id", (req, res) => {
  const id = Number(req.params.id);
  const hittat = projekt.find((p) => p.id === id);

  if (!hittat) {
    return res.status(404).json({ fel: "Projektet finns inte" });
  }

  res.json(hittat);
});

app.get("/statistik", (req, res) => {
  res.json({ antal: projekt.length });
});

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});