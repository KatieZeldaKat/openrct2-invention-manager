/**
 * Durstenfeld's version of the Fisher-Yates shuffle algorithm. Shuffles an array in O(n).
 * @param array The array to shuffle (modified by reference).
 * @param start The index of the first element to shuffle; by default the beginning of the array.
 * @param end The index after the last element to shuffle; by default the length of the array.
 * @returns A reference to the same array; the parameter array is shuffled in place.
 */
export function shuffle<T>(array: T[], start?: number, end?: number): T[] {
    start = start ?? 0;
    end = end ?? array.length;

    for (let index = end - 1; index > start; index--) {
        let chosenIndex = randomInteger(start, index + 1);

        // Swap the values between the current and chosen indicies
        let tempItem = array[index];
        array[index] = array[chosenIndex];
        array[chosenIndex] = tempItem;
    }

    return array;
}

/**
 * Generates a random integer in a given range.
 * @param min The minimum value to generate (inclusive).
 * @param max The maximum value to generate (exclusive).
 * @returns An integer between the specified min and max values.
 */
function randomInteger(min: number, max: number): number {
    let rangeSize = max - min;
    return Math.floor(rangeSize * Math.random() + min);
}
