import { inventionTab } from "./inventionTab";
import * as flex from "openrct2-flexui";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
    window = flex.tabwindow({
        title: "Invention Manager",
        width: { value: 600, min: 400, max: 1200 },
        height: { value: 400, min: 315, max: 800 },
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

/**
 * Opens the main window. If already open, the window will be focused.
 */
export function openWindow() {
    if (isWindowOpen) {
        window.focus();
    } else {
        window.open();
    }
}
