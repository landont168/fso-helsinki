import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosis";
import patientsRouter from "./routes/patients";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// routers
app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
