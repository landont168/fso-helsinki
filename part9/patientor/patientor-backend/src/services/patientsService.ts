import patientsData from "../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id: id,
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
