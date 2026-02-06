const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const doshaEngine = require("./logic/doshaEngine");
const agniEngine = require("./logic/agniEngine");
const dietEngine = require("./logic/dietEngine");
const explainEngine = require("./logic/explainEngine");

const app = express();
app.use(cors());
app.use(express.json());

// Paths
const FRONTEND_PATH = path.join(__dirname, "../frontend");
const DATA_FILE = path.join(__dirname, "data/patients.json");

// Serve frontend
app.use(express.static(FRONTEND_PATH));
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// Analyze patient
app.post("/analyze", (req, res) => {
  try {
    const input = req.body;

    const dosha = doshaEngine(input);
    const agni = agniEngine(input);

    const lifestyle = {
      appetite: input.appetite,
      stress: input.stress,
      bodyType: input.body
    };

    const diet = dietEngine(
      dosha.dominant,
      agni,
      lifestyle,
      input.budget || "medium"
    );

    const explanation = explainEngine(input, dosha, agni);

    const record = {
      patient: {
        name: input.name || "",
        phone: input.phone || "",
        createdAt: new Date().toISOString()
      },
      input,
      dosha,
      agni,
      diet,
      explanation
    };

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
      data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }

    data.push(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});
// =====================
// SAVE PATIENT OUTCOME
// =====================
app.post("/outcome", (req, res) => {
  try {
    const { patientName, outcome } = req.body;

    if (!fs.existsSync(DATA_FILE)) {
      return res.status(400).json({ error: "No patient data found" });
    }

    let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

    // Find latest patient record
    const patient = data.reverse().find(p => p.patient.name === patientName);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (!patient.outcomes) {
      patient.outcomes = [];
    }

    patient.outcomes.push({
      ...outcome,
      date: new Date().toISOString()
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(data.reverse(), null, 2));

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Outcome save failed" });
  }
});


// Fetch patients
app.get("/patients", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
