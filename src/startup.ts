// @ts-ignore
import * as info from "./info.js";


export function startup()
{
	// Write code here that should happen on startup of the plugin.
	console.log("Hello world!");

	// Register a menu item under the map icon:
	if (typeof ui !== "undefined")
	{
		ui.registerMenuItem(info.name, () => onClickMenuItem());
	}
}


function onClickMenuItem()
{
	// Write code here that should happen when the player clicks the menu item under the map icon.
	console.log("Clicked menu item");
}
