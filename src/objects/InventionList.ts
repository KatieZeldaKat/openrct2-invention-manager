import { Invention } from "./Invention";

let inventedItems: Invention[];
let uninventedItems: Invention[];

export function load() {
    inventedItems = park.research.inventedItems.map((item) => {
        return new Invention(item);
    });
    uninventedItems = park.research.uninventedItems.map((item) => {
        return new Invention(item);
    });
}

export function getAllInvented() {
    return getInvented((_) => true);
}

export function getAllUninvented() {
    return getUninvented((_) => true);
}

export function getInventedCategory(category: "scenery" | RideResearchCategory) {
    return getInvented((invention) => invention.category === category);
}

export function getUninventedCategory(category: "scenery" | RideResearchCategory) {
    return getUninvented((invention) => invention.category === category);
}

function getInvented(filter: (invention: Invention) => boolean): Invention[] {
    return inventedItems.filter(filter);
}

function getUninvented(filter: (invention: Invention) => boolean): Invention[] {
    return uninventedItems.filter(filter);
}
