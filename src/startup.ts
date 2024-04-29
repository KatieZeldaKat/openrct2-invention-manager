import * as window from "./window/window.js";

export function startup() {
    if (network.mode !== "none") {
        return;
    }

    // Register a menu item under the map icon:
    if (typeof ui !== "undefined") {
        window.initialize();
        ui.registerMenuItem("Invention Manager", () => window.openWindow());
    }
}
