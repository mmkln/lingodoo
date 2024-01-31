import { cutArrayRange } from './cutArrayRange.util'; // Replace with the correct import path

describe('cutArrayRange function', () => {
    it('should cut elements from the 1st to 5th element', () => {
        const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const newArray = cutArrayRange(originalArray, 1, 5);
        expect(newArray).toEqual([2, 3, 4, 5, 6]);
    });

    it('should handle out-of-bounds start index', () => {
        const originalArray = [1, 2, 3];
        const newArray = cutArrayRange(originalArray, -1, 2);
        expect(newArray).toEqual([1, 2, 3]);
    });

    it('should handle out-of-bounds end index', () => {
        const originalArray = [1, 2, 3];
        const newArray = cutArrayRange(originalArray, 0, 5);
        expect(newArray).toEqual([1, 2, 3]);
    });

    it('should handle empty range', () => {
        const originalArray = [1, 2, 3];
        const newArray = cutArrayRange(originalArray, 2, 1);
        expect(newArray).toEqual([]);
    });

    it('should return an empty array if start and end are out of bounds', () => {
        const originalArray: number[] = [];
        const newArray = cutArrayRange(originalArray, -1, 5);
        expect(newArray).toEqual([]);
    });
});
