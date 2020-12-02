import { RoombaType, RoombaCleaned } from "./types";
import { moveNorth, moveEast, moveSouth, moveWest, checkIfSquareIsDirty } from "./Utils/Directions";
const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err: any, data: any) {
    if (err) throw err;
    if (!data || data.length < 4) {
        throw ("No dirt or directions.")
    }
    const COORDINATES: number[] = [];
    const DIRECTIONS: string[] = [];
    for (let i = 0; i < data.length; i++) {
        const char = data[i];    
        if (char === 'N' || char === 'S' || char === 'W' || char === 'E') {
            DIRECTIONS.push(char);
        } else if (char !== ' ' && char !== '\n') {
            COORDINATES.push(+char);
        }
    }

    const GRID = [COORDINATES[0], COORDINATES[1]];
    const STARTING = [COORDINATES[2], COORDINATES[3]];
    const DIRT_PATCHES = COORDINATES.slice(4);
    const DIRT_COORDINATES = [];
    for (let i = 0; i < DIRT_PATCHES.length; i += 2) {
        const x = DIRT_PATCHES[i];
        const y = DIRT_PATCHES[i + 1];
        DIRT_COORDINATES.push([x, y]);
    };

    const Roomba = createRoomba({GRID, STARTING, DIRT_COORDINATES, DIRECTIONS});
    const RoombaCleanedStats: RoombaCleaned = Roomba.clean();
    displayCleaningStats(RoombaCleanedStats);
});

const createRoomba = ({ GRID, STARTING, DIRT_COORDINATES, DIRECTIONS }: RoombaType) => {
    GRID = GRID;
    STARTING = STARTING;
    DIRT_COORDINATES = DIRT_COORDINATES;
    DIRECTIONS = DIRECTIONS;
    
    const clean = (): RoombaCleaned => {
        console.log(`Roomba is beginning to clean your mess from ${STARTING}`)
        let currentLocation = STARTING;
        let dirtPatchesCleaned = 0;
            DIRECTIONS.forEach(direction => {
            switch (direction) {
                case "N": {
                    currentLocation = moveNorth(currentLocation, GRID[1]);
                    if (checkIfSquareIsDirty(currentLocation, DIRT_COORDINATES)) {
                        dirtPatchesCleaned += 1;
                    }
                    break;
                }
                case "E": {
                    currentLocation = moveEast(currentLocation, GRID[0]);
                    if (checkIfSquareIsDirty(currentLocation, DIRT_COORDINATES)) {
                        dirtPatchesCleaned += 1;
                    }
                    break;
                }
                case "S": {
                    currentLocation = moveSouth(currentLocation);
                    if (checkIfSquareIsDirty(currentLocation, DIRT_COORDINATES)) {
                        dirtPatchesCleaned += 1;
                    }
                    break;
                }
                case "W": {
                    currentLocation = moveWest(currentLocation);
                    if (checkIfSquareIsDirty(currentLocation, DIRT_COORDINATES)) {
                        dirtPatchesCleaned += 1;
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return { endingCoordinates: currentLocation, dirtPatchesCleaned }
    };
    return { clean }
};


const displayCleaningStats = (data: RoombaCleaned) => {
    console.log(`Roomba's final grid location is: ${data.endingCoordinates}.`);
    console.log(`Roomba cleaned a total of ${data.dirtPatchesCleaned} Dirt Patches.`);
    console.log('Roomba has finished cleaning your mess!');
}