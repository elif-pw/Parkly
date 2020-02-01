import {
    parkingAdded,
    parkingidfetch
} from "./actions";
import ParkingDataService from "../service/ParkingDataService";


export const newParkingAdded = (parking) => {
    return (dispatch) => {
        return (ParkingDataService.createParking([parking])
            .then(response => dispatch(parkingidfetch(response.data))))

    }
}

export const addParking = (parking) => {
    return (dispatch) => {
        return dispatch(parkingAdded(parking))

    }

}

export const addNewParkingwithId = (parking) => {
    return (dispatch) => {
        return dispatch(newParkingAdded(parking)).then(() => {
            return dispatch(addParking(parking))
        })
    }
}

