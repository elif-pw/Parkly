import {
    PARKING_LOADED, PARKING_ADDED,
    PARKING_DELETED,
    PARKING_UPDATED,
    PARKING_FETCHED
} from "./constants";

export const parkingsLoaded = parkings => {
    return {
        type: PARKING_LOADED,
        payload: {
            parkings
        }
    };
};

export const parkingAdded = (parking) => {
    console.log(parking);
    return {
        type: PARKING_ADDED,
        payload: {
            parking
        }
    };
};


export const parkingDeleted = (id) => {
    console.log(id);
    return {
        type: PARKING_DELETED,
        payload: {
            id
        }
    };
};

export const parkingUpdated = (parking) => {
    return {
        type: PARKING_UPDATED,
        payload: {
            parking
        }
    };
};

export function parkingFetched(id) {
    return {
        type: PARKING_FETCHED,
        payload: {
            id
        }
    }
}
