import {
    PARKING_LOADED, PARKING_ADDED,
    PARKING_UPDATED, PARKING_DELETED, PARKING_FETCHED
} from "./constants";

export const initialState = {
    parkings: [],
    isLoaded: false,
    parking: undefined

};

const appReducer = (state = initialState, action) => {
        switch (action.type) {
            case PARKING_LOADED: {
                const {parkings} = action.payload;
                return {
                    ...state, parkings, isLoaded: true
                };
            }
            case PARKING_ADDED: {
                const newParking = action.payload.parking;
                const newParkings = [...state.parkings, newParking];
                return {...state, parkings: newParkings};
            }
            case PARKING_DELETED: {
                const {id} = action.payload;
                const index = state.parkings.findIndex(item => item.id == id);
                if (index > -1) {
                    let newParkings = [...state.parkings];
                    newParkings.splice(index, 1);
                    return {...state, parkings: newParkings};
                } else {
                    return state;
                }

            }
            case PARKING_UPDATED: {
                const list = state.parkings;
                const index = state.parkings.findIndex(i => i.id == action.payload.parking.id);
                if (index > -1) {
                    list.splice(index, 1, action.payload.parking)
                    return {...state, parkings: list};
                } else {
                    return state;
                }
            }
            case PARKING_FETCHED: {

            }


            default:
                return state;
        }
    }
;

export default appReducer;