# Inventions Manager for OpenRCT2

An alternative to the built-in inventions list found under the cheat menu. Adds the ability to filter inventions by research group, move around inventions while preserving other inventions' order, and more! Designed for ease of use when creating scenarios.

![Invention Manager startup window](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/startup.png?raw=true)

## Getting the plugin

Download the `.js` file from the [latest release](https://github.com/KatieZeldaKat/openrct2-invention-manager/releases/latest) and place it in the "plugin" folder. This can be found by opening OpenRCT2 and selecting "Open custom content folder" under the toolbox in the main menu.

---

## Selecting an invention

If you hover over any item in the "available inventions" or "to be invented" lists, you will see a preview image and information about it. Simply click one to select it. Once selected, hovering over other inventions will no longer update the preview. To deselect an invention, click on it again. You may also click on another invention to select that instead.

![Selecting and deselecting inventions](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/select-invention.gif?raw=true)

## Research group tabs

There are seven different research groups items are invented in:

1. Transport Rides
2. Gentle Rides
3. Roller Coasters
4. Thrill Rides
5. Water Rides
6. Shops & Stalls
7. Scenery & Theming

This plugin organizes these research groups into tabs you can click on to filter which inventions are shown. There is also an "All" tab (designated by the red conical flask), which displays all inventions at once, similarly to the built-in inventions list.

![Cycle through research group tabs](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/research-group-tabs.gif?raw=true)

## Moving inventions around

The built-in invention list allows for click-and-drag to move around inventions. Plugin windows cannot do this as of yet. As such, there are buttons you can use to move them around and between lists.

### Make invented/uninvented

To make an invented item move to the "to be invented" list, simply select it and click the big red down arrow.

To make an item that is yet to be invented move to the "available inventions" list, simply select it and click the big red up arrow.

![Moving the Chip Shop up and down with the red arrows](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/chips-invent-uninvent.gif?raw=true)

There are also buttons which let you invent all items or uninvent all items. This only affects whatever tab you are in. For example, clicking either button in the tab for Thrill Rides will only affect this research category.

![Inventing and uninventing all Thrill Rides](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/invent-uninvent-all.gif?raw=true)

### Change invention order

For simplicity, the "available inventions" list's order is locked. Inventions are grouped by research group, then sorted alphabetically. This was done to simplify searching for a given invention, as the order of invented items has no impact on gameplay.

As for inventions "to be invented", you have full control. After selecting an invention, use the small arrows to move the item up or down in the list.

![Moving the Twist invention up and down](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/change-order.gif?raw=true)

When in the "All" tab, moving inventions up and down will behave the same as the built-in inventions list. However, when in any of the other tabs, the inventions are modified differently. Say there are two "Shops & Stalls" to be invented: a Chip Shop and a Cash Machine. Note the positions in the overall list:

![The "to be invented" list with the Chip Shop and Cash Machine highlighted, with other inventions between and around them](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/shops-stalls-before.png?raw=true)

Now, going to the "Shops & Stalls" tab, we can swap the order these are invented in:

![The Chip Shop is swapped to be invented after the Cash Machine](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/shops-stalls-swap.gif?raw=true)

After we make this change, the Cash Machine is now set to be invented before the Chip Shop while preserving the rest of the invention order:

![The "to be invented" list again with Chip Shop and Cash Machine highlighted, but swapped in order from before](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/shops-stalls-after.png?raw=true)

## Shuffle

In every tab other than the "All" tab, shuffling behaves as expected. Upon clicking the button, all inventions "to be invented" will shuffle around into a random order. As mentioned before, the "available inventions" have a set order, and as such, they will not shuffle.

![Shuffling the Roller Coasters tab](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/shuffle-rollercoasters.gif?raw=true)

Upon clicking the button in the "All" tab, the inventions are shuffled such that the order of inventions within the research groups are preserved. This can be useful to make a random order of inventions while still ensuring certain inventions are researched before others (like a Virginia Reel always being researched before a Multi-Dimensional Coaster).

![Shuffling the "All" tab and showing the preserved order of Roller Coasters](https://github.com/KatieZeldaKat/openrct2-invention-manager/blob/v1.0.0/docs/images/shuffle-all.gif?raw=true)
