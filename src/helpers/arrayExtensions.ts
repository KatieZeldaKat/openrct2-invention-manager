/**
 * Meant to be passed as an argument to the built-in Array.sort() method. Doing so will sort
 * the array of numbers from least to greatest, instead of treating the numbers like strings.
 */
export function sortLeastToGreatest(first: number, second: number) {
    return first - second;
}

/**
 * Searches through an array until a specified condition is met (as an alternative
 * to the built-in way of searching for a specific element in an array).
 * @param array The array to search through.
 * @param condition The condition to be met by the item for it to be found.
 * @param startIndex The index the search should begin at.
 * @returns The first index of a matching item, or -1 if not found.
 */
export function indexOf<T>(
    array: T[],
    condition: (item: T) => boolean,
    startIndex: number = 0,
): number {
    for (let index = startIndex; index < array.length; index++) {
        if (condition(array[index])) {
            return index;
        }
    }

    return -1;
}

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
