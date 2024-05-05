import * as inventionList from "./helpers/inventions.js";
import * as window from "./window/window.js";

export function startup() {
    if (network.mode !== "none" || typeof ui === "undefined") {
        return;
    }

    // Subscribe to invention list changes
    inventionList.initialize();

    // Create window
    window.initialize();
    ui.registerMenuItem("Invention Manager", () => window.openWindow());
}
