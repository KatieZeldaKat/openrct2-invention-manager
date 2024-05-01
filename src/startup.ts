import * as window from "./window/window.js";

export function startup() {
    if (network.mode !== "none" || typeof ui === "undefined") {
        return;
    }

    window.initialize();
    ui.registerMenuItem("Invention Manager", () => window.openWindow());
}
