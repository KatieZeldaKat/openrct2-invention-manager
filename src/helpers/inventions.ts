import { WritableStore, compute, store } from "openrct2-flexui";
import { Invention } from "../objects/Invention";
import { indexOf } from "./search";

export const categories = [
    "transport",
    "gentle",
    "rollercoaster",
    "thrill",
    "water",
    "shop",
    "scenery",
];

const inventions: WritableStore<Invention[]> = store([]);
const categorizedInventions: {
    [category: string]: { [invented: string]: WritableStore<Invention[]> };
} = {
    all: { true: store([]), false: store([]) },
    transport: { true: store([]), false: store([]) },
    gentle: { true: store([]), false: store([]) },
    rollercoaster: { true: store([]), false: store([]) },
    thrill: { true: store([]), false: store([]) },
    water: { true: store([]), false: store([]) },
    shop: { true: store([]), false: store([]) },
    scenery: { true: store([]), false: store([]) },
};

const inventionObjects: { [identifier: string]: Invention } = {};

export function initialize() {
    inventions.subscribe((inventions) => {
        const invented = inventions
            .filter((invention) => invention.invented)
            .sort(Invention.compare);
        const uninvented = inventions.filter((invention) => !invention.invented);

        categories.concat("all").forEach((category) => {
            categorizedInventions[category].true.set(filterCategory(invented, category));
            categorizedInventions[category].false.set(filterCategory(uninvented, category));
        });

        const inventedResearch = invented.map((invention) => invention.researchItem);
        const uninventedResearch = uninvented.map((invention) => invention.researchItem);

        // Must be set twice due to a race condition. If an object is removed from the list
        // before being added to the other, it creates a duplicate entry. Setting twice ensures
        // this object is removed fully from one list and added to the other.
        park.research.inventedItems = inventedResearch;
        park.research.uninventedItems = uninventedResearch;
        park.research.inventedItems = inventedResearch;
    });
}

/**
 * Takes the data from `park.research` and imports it into the locally tracked data.
 * Should be called frequently enough to ensure data is not mismatched through regular play
 * and/or adding new objects to the park.
 */
export function load() {
    const invented = park.research.inventedItems
        .map((item) => getInvention(item, true))
        .sort(Invention.compare);
    const uninvented = park.research.uninventedItems.map((item) => {
        return getInvention(item, false);
    });

    inventions.set(invented.concat(uninvented));
}

/**
 * Gets a list of inventions that meet the given criteria.
 * @param category The research category the items pertain to.
 * @param invented Whether to get invented or uninvented items (true for invented).
 * @returns A list of inventions.
 */
export function get(category: "all" | "scenery" | RideResearchCategory, invented: boolean) {
    return categorizedInventions[category][String(invented)].get().concat();
}

/**
 * Executes `compute` from FlexUI on the invention list.
 * @param category The research category the items pertain to.
 * @param invented Whether to get invented or uninvented items (true for invented).
 * @param callback The callback to execute when the list updates.
 * @returns A `Bindable` store to use with supporting FlexUI elements.
 */
export function computeInventions<T>(
    category: "all" | "scenery" | RideResearchCategory,
    invented: boolean,
    callback: (value: Invention[]) => T,
): WritableStore<T> {
    return compute(categorizedInventions[category][String(invented)], callback);
}

/**
 * Updates invention data to pass to UI elements.
 * @param updated A list of inventions that have been updated and/or reordered.
 */
export function update(...updated: Invention[]) {
    // Get where all the inventions already exist in the array
    const inventionsCopy = inventions.get().concat();
    const indicies = updated
        .map((updatedInvention) =>
            indexOf(
                inventionsCopy,
                (invention) => invention.identifier === updatedInvention.identifier,
            ),
        )
        .sort();

    // Keep the order of the updated array by iterating through the inventionsCopy sequentially
    updated.forEach((updatedInvention, index) => {
        inventionsCopy[indicies[index]] = updatedInvention;
    });

    // Update the inventions
    inventions.set(inventionsCopy);
    load();
}

function getInvention(researchItem: ResearchItem, invented: boolean): Invention {
    const type: ObjectType = researchItem.category === "scenery" ? "scenery_group" : "ride";
    const identifier = objectManager.getObject(type, researchItem.object).identifier;
    inventionObjects[identifier] ??= new Invention(researchItem, invented);

    return inventionObjects[identifier];
}

function filterCategory(list: Invention[], category: string): Invention[] {
    return list.filter(
        category === "all" ? (_) => true : (invention) => invention.category === category,
    );
}
