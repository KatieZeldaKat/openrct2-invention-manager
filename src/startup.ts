import * as inventions from "./helpers/inventions.js";
import * as window from "./window/window.js";

export function startup() {
    if (network.mode !== "none" || typeof ui === "undefined") {
        return;
    }

    // Initialize invention tracking
    inventions.initialize();

    // Create window
    window.initialize();
    ui.registerMenuItem("Invention Manager", () => window.openWindow());
}
