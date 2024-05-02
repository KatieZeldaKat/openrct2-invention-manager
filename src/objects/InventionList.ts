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

    inventedItems.sort(Invention.compare);
}

export function getInvented(category: "all" | "scenery" | RideResearchCategory) {
    return inventedItems.filter(
        category === "all" ? (_) => true : (invention) => invention.category === category,
    );
}

export function getUninvented(category: "all" | "scenery" | RideResearchCategory) {
    return uninventedItems.filter(
        category === "all" ? (_) => true : (invention) => invention.category === category,
    );
}
