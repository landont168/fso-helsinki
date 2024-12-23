import express from 'express';
import { calculateBmi } from './bmiCalculator';

import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // get input from query
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // ensure numbers are provided as input
  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  // calculate bmi
  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // check if parameters are missing
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }

  // check if parameters are of correct type
  if (isNotNumber(target) || !Array.isArray(daily_exercises) || daily_exercises.some(isNotNumber)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  
  const daily_exercises_arr = daily_exercises as number[]; // type assertion
  const result = calculateExercises(daily_exercises_arr, Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
