import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { newPatientSchema } from "../utils";
import { NewPatient, Patient } from "../types";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

// endpoints
router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

// get patient
router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body); // add patient
    res.json(addedPatient);
  }
);

// error handling middleware
router.use(errorMiddleware);

export default router;
