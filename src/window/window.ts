import * as flex from "openrct2-flexui";
import * as inventionList from "../objects/InventionList";
import { inventionTab } from "../objects/InventionTab";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
    inventionList.load();
    window = flex.tabwindow({
        title: "Invention Manager",
        width: { value: 600, min: 400, max: 1200 },
        height: { value: 400, min: 300, max: 800 },
        position: "center",
        colours: [flex.Colour.LightPurple, flex.Colour.Grey, flex.Colour.Grey],
        onOpen: () => (isWindowOpen = true),
        onClose: () => (isWindowOpen = false),
        tabs: [
            inventionTab("all"),
            inventionTab("transport"),
            inventionTab("gentle"),
            inventionTab("rollercoaster"),
            inventionTab("thrill"),
            inventionTab("water"),
            inventionTab("shop"),
            inventionTab("scenery"),
        ],
    });
}

export function openWindow() {
    if (isWindowOpen) {
        window.focus();
    } else {
        inventionList.load();
        window.open();
    }
}
