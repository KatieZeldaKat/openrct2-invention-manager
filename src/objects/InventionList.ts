import { WritableStore, store } from "openrct2-flexui";
import { Invention } from "./Invention";

export const invented: { [category: string]: WritableStore<Invention[]> } = {
    all: store([]),
    transport: store([]),
    gentle: store([]),
    rollercoaster: store([]),
    thrill: store([]),
    water: store([]),
    shop: store([]),
    scenery: store([]),
};

export const uninvented: { [category: string]: WritableStore<Invention[]> } = {
    all: store([]),
    transport: store([]),
    gentle: store([]),
    rollercoaster: store([]),
    thrill: store([]),
    water: store([]),
    shop: store([]),
    scenery: store([]),
};

const categories = [
    "all",
    "transport",
    "gentle",
    "rollercoaster",
    "thrill",
    "water",
    "shop",
    "scenery",
];

export function load() {
    let inventedList = park.research.inventedItems.map((item) => {
        return new Invention(item);
    });
    let uninventedList = park.research.uninventedItems.map((item) => {
        return new Invention(item);
    });

    inventedList.sort(Invention.compare);
    park.research.inventedItems = inventedList.map((invention) => invention.researchItem);

    categories.forEach((category) => {
        invented[category].set(filterCategory(inventedList, category));
        uninvented[category].set(filterCategory(uninventedList, category));
    });
}

export function filterCategory(list: Invention[], category: string) {
    return list.filter(
        category === "all" ? (_) => true : (invention) => invention.category === category,
    );
}
