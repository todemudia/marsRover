import { executeInstructions } from '../services/roverService';
import { parseInput } from '../utils/inputParser';
import { Plateau, Rover } from '../models/types';

describe('Mars Rover', () => {
    let plateau: Plateau;
    let rover1: Rover;
    let rover2: Rover;

    beforeEach(() => {
        const input = `
        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM
        `;
        const parsed = parseInput(input);
        plateau = parsed.plateau;
        [rover1, rover2] = parsed.rovers;
    });

    test('Rover 1 final position and direction', () => {
        const finalRover = executeInstructions(rover1, plateau);
        expect(finalRover.position).toEqual({ x: 1, y: 3, direction: 'N' });
        expect(finalRover.error).toBeUndefined();
    });

    test('Rover 2 final position and direction', () => {
        const finalRover = executeInstructions(rover2, plateau);
        expect(finalRover.position).toEqual({ x: 5, y: 1, direction: 'E' });
        expect(finalRover.error).toBeUndefined();
    });

    test('Rover starting at edge and moving out of bounds', () => {
        const edgeCaseInput = `
        5 5
        5 5 N
        M
        `;
        const parsed = parseInput(edgeCaseInput);
        const plateau = parsed.plateau;
        const rover = parsed.rovers[0];

        const finalRover = executeInstructions(rover, plateau);
        expect(finalRover.error).toBe('Rover moved out of plateau bounds');
    });

    test('Rover with invalid instructions', () => {
        const invalidInstructionInput = `
        5 5
        1 2 N
        LMX
        `;
        expect(() => parseInput(invalidInstructionInput)).toThrow('Invalid instructions for rover at (1, 2)');
    });

    test('Rover with invalid starting position', () => {
        const invalidPositionInput = `
        5 5
        6 6 N
        LMLMLMLMM
        `;
        expect(() => parseInput(invalidPositionInput)).toThrow('Rover starting position out of bounds: (6, 6)');
    });

    test('Multiple rovers on plateau', () => {
        const multipleRoversInput = `
        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM
        0 0 S
        MMM
        `;
        const parsed = parseInput(multipleRoversInput);
        const plateau = parsed.plateau;
        const rovers = parsed.rovers;

        const results = rovers.map(rover => executeInstructions(rover, plateau));
        const errors = results.filter(result => result.error !== undefined);
        expect(errors.length).toBeGreaterThan(0);
    });
});
