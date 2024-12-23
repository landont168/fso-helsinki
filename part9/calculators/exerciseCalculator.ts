import { isNotNumber } from './utils';

// define interface of input object
interface Input {
  exercises: Array<number>;
  target: number;
}

// define interface of result object
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target = 0;
  if (!isNotNumber(args[2])) {
    target = Number(args[2]);
  }

  // add remaning arguments to array
  const exercises = args.slice(3).map((day) => {
    if (isNotNumber(day)) {
      throw new Error('Provided values were not numbers!');
    }
    return Number(day);
  });

  return {
    exercises,
    target,
  };
};

const calculateExercises = (
  exercises: Array<number>,
  target: number
): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((day) => day > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target - 1 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? 'Great job!'
      : rating === 2
      ? 'Not too bad but could be better'
      : 'You need to work harder';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// run program with command line arguments
if (require.main === module) {
  try {
    const { exercises, target } = parseArguments(process.argv);
    console.log(calculateExercises(exercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises };
