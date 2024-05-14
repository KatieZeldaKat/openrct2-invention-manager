import * as inventions from "../helpers/inventions";
import { Invention } from "../objects/Invention";
import { shuffle } from "../helpers/shuffle";
import {
    LayoutDirection,
    WritableStore,
    store,
    compute,
    tab,
    horizontal,
    vertical,
    listview,
    label,
    button,
} from "openrct2-flexui";

const tabImageMap: { [category: string]: number | ImageAnimation } = {
    all: { frameBase: 5327, frameCount: 8, frameDuration: 2 },
    transport: { frameBase: 5537, frameCount: 5, frameDuration: 4 },
    gentle: { frameBase: 5542, frameCount: 4, frameDuration: 8 },
    rollercoaster: { frameBase: 5546, frameCount: 5, frameDuration: 2 },
    thrill: 5562, // ImageAnimation doesn't work; unsure if possible to animate manually
    water: { frameBase: 5551, frameCount: 6, frameDuration: 4 },
    shop: { frameBase: 5530, frameCount: 7, frameDuration: 4 },
    scenery: 5459,
};

const categoryMap: { [category: string]: string } = {
    transport: "Transport Rides",
    gentle: "Gentle Rides",
    rollercoaster: "Roller Coasters",
    thrill: "Thrill Rides",
    water: "Water Rides",
    shop: "Shops & Stalls",
    scenery: "Scenery & Theming",
};

export function inventionTab(category: "all" | "scenery" | RideResearchCategory) {
    const selected = store<Invention | undefined>();
    return tab({
        image: tabImageMap[category],
        direction: LayoutDirection.Horizontal,
        content: tabContent(category, selected),
        onOpen: () => {
            inventions.load();
            selected.set(undefined);
        },
    });
}

function tabContent(
    category: "all" | "scenery" | RideResearchCategory,
    selected: WritableStore<Invention | undefined>,
) {
    return [
        vertical({
            spacing: 1,
            content: [
                label({ text: "{WHITE}Items pre-invented at start of game:", padding: 0 }),
                createListView(category, selected, true),
                label({ text: "{WHITE}Items to invent during game:", padding: { top: 5 } }),
                createListView(category, selected, false),
            ],
        }),
        createSidebar(category, selected),
    ];
}

function createSidebar(
    category: "all" | "scenery" | RideResearchCategory,
    selected: WritableStore<Invention | undefined>,
) {
    const image = compute(selected, (invention) => invention?.previewImage ?? 0);
    const visible = compute(selected, (invention) => (invention ? "visible" : "hidden"));
    return vertical({
        spacing: 0,
        content: [
            button({
                height: 110,
                width: 110,
                padding: { top: "20%", bottom: 5, left: 40 },
                image: image,
                visibility: visible,
            }),
            label({
                text: compute(selected, (invention) => `{WHITE}${invention?.type ?? ""}`),
                width: 190,
                alignment: "centred",
                padding: { left: 2, bottom: 0 },
                visibility: visible,
            }),
            label({
                text: compute(selected, (invention) => `{BLACK}${invention?.name ?? ""}`),
                width: 190,
                alignment: "centred",
                padding: { left: 2, top: 0 },
                visibility: visible,
            }),
            label({
                text: compute(
                    selected,
                    (invention) =>
                        `{WHITE}Research Group: {BLACK}${categoryMap[invention?.category ?? ""]}`,
                ),
                width: 190,
                padding: [8, 2],
                visibility: visible,
            }),
            horizontal({
                padding: { left: 55 },
                content: [
                    createSwapButton("arrow_up", selected, false),
                    vertical({
                        spacing: 1,
                        padding: { bottom: 10 },
                        content: [
                            createShiftButton("▲", category, selected, true),
                            createShiftButton("▼", category, selected, false),
                        ],
                    }),
                    createSwapButton("arrow_down", selected, true),
                ],
            }),
            createListButton("Shuffle", category, false, () => {
                if (category === "all") {
                    const shuffledCategories: ("scenery" | RideResearchCategory)[] = [];
                    const uninventedReversed: { [category: string]: Invention[] } = {};

                    // Cache the uninvented items in a reversed list
                    // and track how many exist in each category
                    inventions.categories.forEach((value) => {
                        const category = value as "scenery" | RideResearchCategory;
                        uninventedReversed[category] = inventions.get(category, false).reverse();
                        const length = uninventedReversed[category].length;
                        for (let iterator = 0; iterator < length; iterator++) {
                            shuffledCategories.push(category);
                        }
                    });

                    shuffle(shuffledCategories);

                    // Each category is shuffled, so the order of each individual
                    // category can be preserved while shuffling them around
                    const shuffledInventions: Invention[] = [];
                    shuffledCategories.forEach((category) => {
                        const invention = uninventedReversed[category].pop() as Invention;
                        shuffledInventions.push(invention);
                    });

                    inventions.update(...shuffledInventions);
                } else {
                    const shuffled = shuffle(inventions.get(category, false));
                    inventions.update(...shuffled);
                }
            }),
            createListButton("Invent All", category, false, () => {
                const uninvented = inventions.get(category, false);
                uninvented.forEach((invention) => (invention.invented = true));
                inventions.update(...uninvented);
            }),
            createListButton("Uninvent All", category, true, () => {
                const invented = inventions.get(category, true);
                invented.forEach((invention) => (invention.invented = false));
                inventions.update(...invented);
            }),
        ],
    });
}

function createListView(
    category: "all" | "scenery" | RideResearchCategory,
    selected: WritableStore<Invention | undefined>,
    invented: boolean,
) {
    const computedInventions = inventions.computeInventions(
        category,
        invented,
        (inventions) => inventions,
    );

    return listview({
        canSelect: false,
        height: "50%",
        padding: 0,
        columns: [{ header: "Type" }, { header: "Object" }],
        items: compute(computedInventions, (inventions) => {
            return inventions.map((invention) => [invention.type, invention.name]);
        }),
        onHighlight: (item) => {
            selected.set(computedInventions.get()[item]);
        },
    });
}

// Swaps inventions between being invented and uninvented
function createSwapButton(
    image: number | IconName,
    selected: WritableStore<Invention | undefined>,
    invented: boolean,
) {
    return button({
        image: image,
        height: 25,
        width: 25,
        disabled: compute(
            selected,
            (invention) => invention === undefined || invention.invented !== invented,
        ),
        onClick: () => {
            const selectedInvention = selected.get() as Invention;
            selectedInvention.invented = !selectedInvention.invented;
            inventions.update(selectedInvention);

            // Update selection so arrows are correct
            selected.set(undefined);
            selected.set(selectedInvention);
        },
    });
}

// Shifts inventions up and down in their respective list
function createShiftButton(
    text: string,
    category: "all" | "scenery" | RideResearchCategory,
    selected: WritableStore<Invention | undefined>,
    top: boolean,
) {
    return button({
        text: text,
        height: 12,
        width: 25,
        padding: 0,
        disabled: compute(selected, (invention) => {
            if (invention === undefined || invention.invented === true) {
                return true;
            }
            const inventionList = inventions.get(category, invention.invented);
            const index = inventionList.indexOf(invention);
            if (top) {
                return index == 0;
            } else {
                return index == inventionList.length - 1;
            }
        }),
        onClick: () => {
            const invention = selected.get() as Invention;
            const inventionList = inventions.get(category, invention.invented);
            const index = inventionList.indexOf(invention);
            const swapIndex = top ? index - 1 : index + 1;

            if (top) {
                inventions.update(invention, inventionList[swapIndex]);
            } else {
                inventions.update(inventionList[swapIndex], invention);
            }

            // Update selection so arrows are correct
            selected.set(undefined);
            selected.set(inventions.get(category, invention.invented)[swapIndex]);
        },
    });
}

function createListButton(
    text: string,
    category: "all" | "scenery" | RideResearchCategory,
    invented: boolean,
    onClick: () => void,
) {
    return button({
        text: text,
        height: 15,
        width: 170,
        padding: [1, 10],
        disabled: inventions.computeInventions(category, invented, (inventions) => {
            return inventions.length == 0;
        }),
        onClick: onClick,
    });
}
