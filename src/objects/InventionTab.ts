import * as inventionList from "../objects/InventionList";
import { horizontal, vertical, listview, button, store, WritableStore } from "openrct2-flexui";
import { Invention } from "./Invention";

export function tabContent(category: "all" | "scenery" | RideResearchCategory) {
    let image = store(inventionList.getInvented(category)[0].previewImage);
    return horizontal([
        vertical([
            createListView(inventionList.getInvented(category), image),
            createListView(inventionList.getUninvented(category), image),
        ]),
        button({
            height: 112,
            width: 112,
            image: image,
        }),
    ]);
}

function createListView(inventionList: Invention[], image: WritableStore<number>) {
    return listview({
        canSelect: true,
        height: 150,
        columns: [{ header: "Type" }, { header: "Object" }],
        items: inventionList.map((invention) => [invention.type, invention.name]),
        onHighlight: (item) => {
            image.set(inventionList[item].previewImage);
        },
    });
}
