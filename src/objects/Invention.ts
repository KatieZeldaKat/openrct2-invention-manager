const rideTypes: { [rideType: number]: string } = {
    0: "Spiral Roller Coaster",
    1: "Stand-up Roller Coaster",
    2: "Suspended Swinging Coaster",
    3: "Inverted Roller Coaster",
    4: "Junior Roller Coaster",
    5: "Miniature Railway",
    6: "Monorail",
    7: "Mini Suspended Coaster",
    8: "Boat Hire",
    9: "Wooden Wild Mouse",
    10: "Steeplechase",
    11: "Car Ride",
    12: "Launched Freefall",
    13: "Bobsleigh Coaster",
    14: "Observation Tower",
    15: "Looping Roller Coaster",
    16: "Dinghy Slide",
    17: "Mine Train Coaster",
    18: "Chairlift",
    19: "Corkscrew Roller Coaster",
    20: "Maze",
    21: "Spiral Slide",
    22: "Go-Karts",
    23: "Log Flume",
    24: "River Rapids",
    25: "Dodgems",
    26: "Pirate Ship",
    27: "Swinging Inverter Ship",
    28: "Food Stall",
    30: "Drink Stall",
    32: "Shop",
    33: "Merry-Go-Round",
    35: "Information Kiosk",
    36: "Toilets",
    37: "Ferris Wheel",
    38: "Motion Simulator",
    39: "3D Cinema",
    40: "Top Spin",
    41: "Space Rings",
    42: "Reverse Freefall Coaster",
    43: "Lift",
    44: "Vertical Drop Roller Coaster",
    45: "Cash Machine",
    46: "Twist",
    47: "Haunted House",
    48: "First Aid Room",
    49: "Circus",
    50: "Ghost Train",
    51: "Twister Roller Coaster",
    52: "Wooden Roller Coaster",
    53: "Side-Friction Roller Coaster",
    54: "Steel Wild Mouse",
    55: "Multi-Dimension Roller Coaster",
    57: "Flying Roller Coaster",
    59: "Virginia Reel",
    60: "Splash Boats",
    61: "Mini Helicopters",
    62: "Lay-down Roller Coaster",
    63: "Suspended Monorail",
    65: "Reverser Roller Coaster",
    66: "Heartline Twister Coaster",
    67: "Mini Golf",
    68: "Giga Coaster",
    69: "Roto-Drop",
    70: "Flying Saucers",
    71: "Crooked House",
    72: "Monorail Cycles",
    73: "Compact Inverted Coaster",
    74: "Water Coaster",
    75: "Air Powered Vertical Coaster",
    76: "Inverted Hairpin Coaster",
    77: "Magic Carpet",
    78: "Submarine Ride",
    79: "River Rafts",
    81: "Enterprise",
    86: "Inverted Impulse Coaster",
    87: "Mini Roller Coaster",
    88: "Mine Ride",
    90: "LIM Launched Roller Coaster",
    91: "Hypercoaster",
    92: "Hyper-Twister",
    93: "Monster Trucks",
    94: "Spinning Wild Mouse",
    95: "Classic Mini Roller Coaster",
    96: "Hybrid Coaster",
    97: "Single Rail Roller Coaster",
    98: "Alpine Coaster",
    99: "Classic Wooden Roller Coaster",
    100: "Classic Stand-up Roller Coaster",
};

const categoryOrder: { [category: string]: number } = {
    transport: 0,
    gentle: 1,
    rollercoaster: 2,
    thrill: 3,
    water: 4,
    shop: 5,
    scenery: 6,
};

export class Invention {
    readonly identifier: string;
    readonly type: string;
    readonly name: string;
    readonly category: "scenery" | RideResearchCategory;
    readonly previewImage: number;
    readonly researchItem: ResearchItem;

    constructor(item: ResearchItem) {
        let objectType: ObjectType = item.type === "ride" ? "ride" : "scenery_group";
        let itemObject = objectManager.getObject(objectType, item.object) as LoadedImageObject;

        this.researchItem = item;
        this.identifier = itemObject.identifier;
        this.name = itemObject.name;
        this.category = item.category;
        this.previewImage = itemObject.baseImageId;
        this.type =
            item.type === "ride"
                ? rideTypes[(item as RideResearchItem).rideType]
                : "Scenery Group";
    }

    public static compare(first: Invention, second: Invention) {
        if (first.category !== second.category) {
            return categoryOrder[first.category] - categoryOrder[second.category];
        } else if (first.category !== "scenery" && first.type !== second.type) {
            return first.type.localeCompare(second.type);
        }

        return first.name.localeCompare(second.name);
    }
}
