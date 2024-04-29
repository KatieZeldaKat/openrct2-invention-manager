import * as flex from "openrct2-flexui";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
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
                content: [flex.label({ text: "All" })],
            }),
            flex.tab({
                image: { frameBase: 5537, frameCount: 5, frameDuration: 4 },
                content: [flex.label({ text: "Transport" })],
            }),
            flex.tab({
                image: { frameBase: 5542, frameCount: 4, frameDuration: 8 },
                content: [flex.label({ text: "Gentle" })],
            }),
            flex.tab({
                image: { frameBase: 5546, frameCount: 5, frameDuration: 2 },
                content: [flex.label({ text: "Rollercoasters" })],
            }),
            flex.tab({
                image: 5562, // Needs custom animation, as ImageAnimation doesn't plug-and-play
                content: [flex.label({ text: "Thrill" })],
            }),
            flex.tab({
                image: { frameBase: 5551, frameCount: 6, frameDuration: 4 },
                content: [flex.label({ text: "Water" })],
            }),
            flex.tab({
                image: { frameBase: 5530, frameCount: 7, frameDuration: 4 },
                content: [flex.label({ text: "Shop" })],
            }),
            flex.tab({
                image: 5459,
                content: [flex.label({ text: "Scenery" })],
            }),
        ],
    });
}

export function openWindow() {
    if (isWindowOpen) {
        window.focus();
    } else {
        window.open();
    }
}
