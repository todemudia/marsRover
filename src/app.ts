import fs from 'fs';
import path from 'path';
import { parseInput } from './utils/inputParser';
import { executeInstructions } from './services/roverService';

const inputFilePath = path.resolve(__dirname, '../testData/input.txt');
const distInputFilePath = path.resolve(__dirname, '../testData/input.txt');
const finalInputFilePath = fs.existsSync(distInputFilePath) ? distInputFilePath : inputFilePath;
const input = fs.readFileSync(finalInputFilePath, 'utf-8');

const { plateau, rovers } = parseInput(input);

rovers.forEach((rover, index) => {
  const finalPosition = executeInstructions(rover, plateau);
  if (finalPosition.error) {
    console.log(`Rover ${index + 1} Final Position: out of bounds`);
  } else {
    console.log(`Rover ${index + 1} Final Position: (${finalPosition.position.x}, ${finalPosition.position.y}, ${finalPosition.position.direction})`);
  }
});
