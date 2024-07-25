import { Position, Plateau, Rover, Direction } from '../models/types';

const turnLeft = (direction: Direction): Direction => {
  switch (direction) {
    case 'N': return 'W';
    case 'E': return 'N';
    case 'S': return 'E';
    case 'W': return 'S';
    default: throw new Error('Invalid direction');
  }
};

const turnRight = (direction: Direction): Direction => {
  switch (direction) {
    case 'N': return 'E';
    case 'E': return 'S';
    case 'S': return 'W';
    case 'W': return 'N';
    default: throw new Error('Invalid direction');
  }
};

const moveForward = (position: Position, plateau: Plateau): Position => {
  const newPosition = { ...position };
  switch (position.direction) {
    case 'N': newPosition.y += 1; break;
    case 'E': newPosition.x += 1; break;
    case 'S': newPosition.y -= 1; break;
    case 'W': newPosition.x -= 1; break;
  }
  if (newPosition.x < 0 || newPosition.x > plateau.width || newPosition.y < 0 || newPosition.y > plateau.height) {
    throw new Error('Rover moved out of plateau bounds');
  }
  return newPosition;
};

export const executeInstructions = (rover: Rover, plateau: Plateau): Rover => {
  let currentPosition: Position = { ...rover.position };
  try {
    for (const instruction of rover.instructions) {
      switch (instruction) {
        case 'L':
          currentPosition.direction = turnLeft(currentPosition.direction);
          break;
        case 'R':
          currentPosition.direction = turnRight(currentPosition.direction);
          break;
        case 'M':
          currentPosition = moveForward(currentPosition, plateau);
          break;
        default:
          throw new Error('Invalid instruction');
      }
    }
    return { ...rover, position: currentPosition, error: undefined };
  } catch (error) {
    return { ...rover, error: (error as Error).message };
  }
};
