type RoombaType = {
    GRID: number[];
    STARTING: number[];
    DIRT_COORDINATES: number[][];
    DIRECTIONS: string[];
}

type RoombaCleaned = {
    endingCoordinates: number[];
    dirtPatchesCleaned: number;
}

export { RoombaType, RoombaCleaned }