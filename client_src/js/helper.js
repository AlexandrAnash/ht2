function getInterval(dragCoordinate, dropCoordinate, axis, k) {
    let sizeProp;
    switch (axis) {
        case axisEnum.x:
            sizeProp = sizePropEnum.width;
            break;
        case axisEnum.y:
            sizeProp = sizePropEnum.height;
            break;
    }
    return dragCoordinate[axis] > dropCoordinate[axis] - dropCoordinate[sizeProp]/2 * k 
        && dragCoordinate[axis] < dropCoordinate[axis] + dropCoordinate[sizeProp]/2 * k
}
function getIntervalX(dragCoordinate, dropCoordinate, axis, k) {
    let sizeProp;
    switch (axis) {
        case axisEnum.x:
            sizeProp = sizePropEnum.width;
            break;
        case axisEnum.y:
            sizeProp = sizePropEnum.height;
            break;
    }
    return dragCoordinate[axis] > dropCoordinate[axis] - dropCoordinate[sizeProp]/2 * k 
        && dragCoordinate[axis] < dropCoordinate[axis] + dropCoordinate[sizeProp]/2 * k
}
