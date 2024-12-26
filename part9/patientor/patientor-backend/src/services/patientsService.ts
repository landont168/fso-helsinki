import patientsData from "../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): PublicPatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
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
  getPatient,
  addPatient,
};
