import {
    PARKING_LOADED, PARKING_ADDED,
    PARKING_DELETED,
    PARKING_UPDATED,
    PARKING_FETCHED,
    PARKING_ADDED_SUCCESS
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
    return {
        type: PARKING_ADDED,
        payload: {
            parking
        }
    };
};

export const parkingidfetch = (id) => {
    return {
        type: PARKING_ADDED_SUCCESS,
        payload: {
            id
        }
    };
};

export const parkingDeleted = (id) => {
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
