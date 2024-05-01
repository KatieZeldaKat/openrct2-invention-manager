import * as flex from "openrct2-flexui";
import * as inventionList from "../objects/InventionList";

let window: flex.WindowTemplate;
let isWindowOpen = false;

export function initialize() {
    inventionList.load();
    let image = flex.store(inventionList.getAllInvented()[0].previewImage);
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
                content: [
                    flex.label({ text: "All" }),
                    flex.horizontal([
                        flex.vertical([
                            flex.listview({
                                canSelect: true,
                                height: 150,
                                columns: [{ header: "Type" }, { header: "Object" }],
                                onHighlight(item) {
                                    image.set(
                                        inventionList.getAllInvented()[item].previewImage,
                                    );
                                },
                                items: inventionList
                                    .getAllInvented()
                                    .map((invention) => [invention.type, invention.name]),
                            }),
                            flex.listview({
                                height: 150,
                                columns: [{ header: "Type" }, { header: "Object" }],
                                items: inventionList
                                    .getAllUninvented()
                                    .map((invention) => [invention.type, invention.name]),
                            }),
                        ]),
                        flex.button({
                            height: 112,
                            width: 112,
                            image: image,
                            disabled: false,
                        }),
                    ]),
                ],
            }),
            flex.tab({
                image: { frameBase: 5537, frameCount: 5, frameDuration: 4 },
                content: [
                    flex.label({ text: "Transport" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("transport")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("transport")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: { frameBase: 5542, frameCount: 4, frameDuration: 8 },
                content: [
                    flex.label({ text: "Gentle" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("gentle")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("gentle")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: { frameBase: 5546, frameCount: 5, frameDuration: 2 },
                content: [
                    flex.label({ text: "Rollercoasters" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("rollercoaster")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("rollercoaster")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: 5562, // Needs custom animation, as ImageAnimation doesn't plug-and-play
                content: [
                    flex.label({ text: "Thrill" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("thrill")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("thrill")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: { frameBase: 5551, frameCount: 6, frameDuration: 4 },
                content: [
                    flex.label({ text: "Water" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("water")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("water")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: { frameBase: 5530, frameCount: 7, frameDuration: 4 },
                content: [
                    flex.label({ text: "Shop" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("shop")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("shop")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
            }),
            flex.tab({
                image: 5459,
                content: [
                    flex.label({ text: "Scenery" }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getInventedCategory("scenery")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                    flex.listview({
                        height: 150,
                        columns: [{ header: "Type" }, { header: "Object" }],
                        items: inventionList
                            .getUninventedCategory("scenery")
                            .map((invention) => [invention.type, invention.name]),
                    }),
                ],
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
