import axios from 'axios'
import AuthenticationService from "../components/AuthenticationService";

// const API_URL = 'http://localhost:8080'
const API_URL = 'http://parklybe.us-east-1.elasticbeanstalk.com'

const config = {
    headers: {
        "Authorization": "Bearer " + sessionStorage.token
    }
}

class ParkingDataService {

    retrieveAllParkings() {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.get(`${API_URL}/Parking`, config);
        }

    }

    retrieveParking(id) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.get(`${API_URL}/Parking/${id}`, config);
        }
    }

    createParking(parking) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.post(`${API_URL}/Parking`, parking, config);

        }

    }

    updateParking(id, parking) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.put(`${API_URL}/Parking/${id}`, parking, config);
        }
    }

    deleteParking(id) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.delete(`${API_URL}/Parking/${id}`, config)
        }
    }


}

export default new ParkingDataService()
