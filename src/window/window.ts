import * as flex from "openrct2-flexui";
import * as inventionList from "../objects/InventionList";
import { tabContent } from "../objects/InventionTab";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
    inventionList.load();
    window = flex.tabwindow({
        title: "Invention Manager",
        width: 500,
        height: "auto",
        position: "center",
        colours: [flex.Colour.LightPurple, flex.Colour.Grey, flex.Colour.Grey],
        onOpen: () => (isWindowOpen = true),
        onClose: () => (isWindowOpen = false),
        tabs: [
            flex.tab({
                image: { frameBase: 5327, frameCount: 8, frameDuration: 2 },
                content: [tabContent("all")],
            }),
            flex.tab({
                image: { frameBase: 5537, frameCount: 5, frameDuration: 4 },
                content: [tabContent("transport")],
            }),
            flex.tab({
                image: { frameBase: 5542, frameCount: 4, frameDuration: 8 },
                content: [tabContent("gentle")],
            }),
            flex.tab({
                image: { frameBase: 5546, frameCount: 5, frameDuration: 2 },
                content: [tabContent("rollercoaster")],
            }),
            flex.tab({
                image: 5562, // Needs custom animation, as ImageAnimation doesn't plug-and-play
                content: [tabContent("thrill")],
            }),
            flex.tab({
                image: { frameBase: 5551, frameCount: 6, frameDuration: 4 },
                content: [tabContent("water")],
            }),
            flex.tab({
                image: { frameBase: 5530, frameCount: 7, frameDuration: 4 },
                content: [tabContent("shop")],
            }),
            flex.tab({
                image: 5459,
                content: [tabContent("scenery")],
            }),
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
