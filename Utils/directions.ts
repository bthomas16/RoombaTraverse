const moveNorth = (currentLocation: number[], boundary: number) => {
    const isAbleToMove = getIsAbleToMoveForward(currentLocation[1], boundary);
    if (isAbleToMove) currentLocation[1] += 1;
    return currentLocation;
}

const moveEast = (currentLocation: number[], boundary: number) => {
    const isAbleToMove = getIsAbleToMoveForward(currentLocation[0], boundary);
    if (isAbleToMove) currentLocation[0] += 1;
    return currentLocation;
}

const moveWest = (currentLocation: number[]) => {
    const westBoundary = 0;
    const isAbleToMove = getIsAbleToMoveBackward(currentLocation[0], westBoundary);
    if (isAbleToMove) currentLocation[0] -= 1;
    return currentLocation;
}

const moveSouth = (currentLocation: number[]) => {
    const southBoundary = 0;
    const isAbleToMove = getIsAbleToMoveBackward(currentLocation[1], southBoundary);
    if (isAbleToMove) currentLocation[1] -= 1;
    return currentLocation;
}

const checkIfSquareIsDirty = (currentLocation: number[], dirtCoordinates: number[][]): boolean => {
    let result = false;
    dirtCoordinates.forEach((coord: number[]) => {
        if (coord[0] == currentLocation[0] && coord[1] == currentLocation[1]) {
            result = true;
        }
    });
    return result;
}

const getIsAbleToMoveForward = (coordinate: number, boundary: number): boolean => {
    let result = true;
    if (coordinate + 1 > boundary) {
        result = false;
    }
    return result;
}

const getIsAbleToMoveBackward = (coordinate: number, boundary: number): boolean => {
    let result = true;
    if (coordinate - 1 < boundary) {
        result = false;
    }
    return result;
}

export { moveNorth, moveSouth, moveWest, moveEast, checkIfSquareIsDirty }