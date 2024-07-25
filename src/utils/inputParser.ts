import { Plateau, Rover, Direction, Movement, Position } from '../models/types';

const isValidDirection = (direction: string): direction is Direction => {
    return ['N', 'E', 'S', 'W'].includes(direction);
};

const isValidMovement = (instruction: string): instruction is Movement => {
    return ['L', 'R', 'M'].includes(instruction);
};

export const parseInput = (input: string): { plateau: Plateau, rovers: Rover[] } => {
    const lines = input.trim().split('\n');
    const plateauDimensions = lines[0].split(' ').map(Number);
    const plateau: Plateau = { width: plateauDimensions[0], height: plateauDimensions[1] };

    if (plateau.width <= 0 || plateau.height <= 0) {
        throw new Error('Invalid plateau dimensions');
    }

    const rovers: Rover[] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, direction] = lines[i].trim().split(' ');

        const position: Position = { x: parseInt(x), y: parseInt(y), direction: direction as Direction };

        if (!isValidDirection(direction)) {
            throw new Error(`Invalid direction: ${direction}`);
        }

        if (position.x < 0 || position.y < 0 || position.x > plateau.width || position.y > plateau.height) {
            throw new Error(`Rover starting position out of bounds: (${position.x}, ${position.y})`);
        }

        const instructions: Movement[] = lines[i + 1].trim().split('') as Movement[];

        if (instructions.some(instr => !isValidMovement(instr))) {
            throw new Error(`Invalid instructions for rover at (${position.x}, ${position.y})`);
        }

        rovers.push({ position, instructions });
    }

    return { plateau, rovers };
};
