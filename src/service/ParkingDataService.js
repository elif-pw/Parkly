import axios from 'axios'
import AuthenticationService from "../components/AuthenticationService";

// const API_URL = 'http://localhost:8080'
const API_URL = 'http://parklybe2.us-east-1.elasticbeanstalk.com'

const config = {
    headers: {
        "Authorization": "Bearer " + sessionStorage.token,
        crossDomain: true,
        'Access-Control-Allow-Origin': '*'
    }
}

class ParkingDataService {

    retrieveAllParkings() {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.get(`${API_URL}/parking`, config);
        }

    }

    retrieveParking(id) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.get(`${API_URL}/parking/${id}`, config);
        }
    }

    createParking(parking) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.post(`${API_URL}/parking`, parking, config);

        }

    }

    updateParking(id, parking) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.put(`${API_URL}/parking/${id}`, parking, config);
        }
    }

    deleteParking(id) {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.delete(`${API_URL}/parking/${id}`, config)
        }
    }


}

export default new ParkingDataService()
