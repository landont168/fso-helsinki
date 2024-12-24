import { Gender } from "./types";
import { z } from "zod";

// desired schema
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown) => {
  return newPatientSchema.parse(object);
};
