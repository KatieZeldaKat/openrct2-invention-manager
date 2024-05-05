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
