export function cutArrayRange<T>(arr: T[], start: number, end: number): T[] {
    // Validate start and end indices
    if (start < 0) {
        start = 0;
    }

    if (end >= arr.length) {
        end = arr.length - 1;
    }

    if (start >= end || start >= arr.length || end < 0) {
        return [];
    }

    return arr.slice(start, end + 1);
}
