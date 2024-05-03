import { Invention } from "./Invention";
import * as inventionList from "../objects/InventionList";
import {
    horizontal,
    vertical,
    listview,
    button,
    store,
    WritableStore,
    label,
    compute,
    tab,
} from "openrct2-flexui";

const tabImageMap: { [category: string]: number | ImageAnimation } = {
    all: { frameBase: 5327, frameCount: 8, frameDuration: 2 },
    transport: { frameBase: 5537, frameCount: 5, frameDuration: 4 },
    gentle: { frameBase: 5542, frameCount: 4, frameDuration: 8 },
    rollercoaster: { frameBase: 5546, frameCount: 5, frameDuration: 2 },
    thrill: 5562, // Needs custom animation, as ImageAnimation doesn't plug-and-play
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
    const lockSelection = store(false);
    const selected = store(selectInvention(category));
    return tab({
        image: tabImageMap[category],
        content: [tabContent(category, lockSelection, selected)],
        onOpen: () => {
            lockSelection.set(false);
            selected.set(selectInvention(category));
        },
    });
}

function tabContent(
    category: "all" | "scenery" | RideResearchCategory,
    lockSelection: WritableStore<boolean>,
    selected: WritableStore<Invention | undefined>,
) {
    return horizontal([
        vertical([
            label({ text: "{WHITE}Items pre-invented at start of game:", padding: 0 }),
            createListView(inventionList.getInvented(category), lockSelection, selected),
            label({ text: "{WHITE}Items to invent during game:", padding: { top: 5 } }),
            createListView(inventionList.getUninvented(category), lockSelection, selected),
        ]),
        createSidebar(category, selected),
    ]);
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
                    createSquareButton("arrow_up", () => {}, selected),
                    vertical({
                        spacing: 1,
                        padding: { bottom: 10 },
                        content: [
                            createArrowButton("▲", () => {}),
                            createArrowButton("▼", () => {}),
                        ],
                    }),
                    createSquareButton("arrow_down", () => {}, selected),
                ],
            }),
            createListButton(
                "Shuffle",
                store(inventionList.getUninvented(category).length == 0),
                () => {},
            ),
            createListButton(
                "Invent All",
                store(inventionList.getUninvented(category).length == 0),
                () => {},
            ),
            createListButton(
                "Uninvent All",
                store(inventionList.getInvented(category).length == 0),
                () => {},
            ),
        ],
    });
}

function createListView(
    inventionList: Invention[],
    lockSelection: WritableStore<boolean>,
    selected: WritableStore<Invention | undefined>,
) {
    return listview({
        canSelect: true,
        height: "50%",
        padding: 0,
        columns: [{ header: "Type" }, { header: "Object" }],
        items: inventionList.map((invention) => [invention.type, invention.name]),
        onHighlight: (item) => {
            if (!lockSelection.get()) {
                selected.set(inventionList[item]);
            }
        },
        onClick: (item) => {
            lockSelection.set(true);
            selected.set(inventionList[item]);
        },
    });
}

function createSquareButton(
    image: number | IconName,
    onClick: () => void,
    selected: WritableStore<Invention | undefined>,
) {
    return button({
        image: image,
        height: 25,
        width: 25,
        disabled: compute(selected, (invention) => {
            if (invention === undefined) {
                return true;
            }

            //return false;
            return true;
        }),
        onClick: onClick,
    });
}

function createArrowButton(text: string, onClick: () => void) {
    return button({
        text: text,
        height: 12,
        width: 25,
        padding: 0,
        disabled: true,
        onClick: onClick,
    });
}

function createListButton(
    text: string,
    disabled: WritableStore<boolean>,
    onClick: () => void,
) {
    return button({
        text: text,
        height: 15,
        width: 170,
        padding: [1, 10],
        disabled: disabled,
        onClick: onClick,
    });
}

function selectInvention(category: "all" | "scenery" | RideResearchCategory) {
    let inventedItems = inventionList.getInvented(category);
    let uninventedItems: Invention[];
    let selectedInvention: Invention | undefined;
    if (inventedItems.length > 0) {
        selectedInvention = inventedItems[0];
    } else {
        uninventedItems = inventionList.getUninvented(category);
        if (uninventedItems.length > 0) {
            selectedInvention = uninventedItems[0];
        } else {
            selectedInvention = undefined;
        }
    }

    return selectedInvention;
}
