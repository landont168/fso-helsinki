import { isNotNumber } from "./utils";

interface Input {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // ensure numbers are provided as input
  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

// height in cm, weight in kg
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  // return string based on bmi
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

// run the program with command line arguments
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
