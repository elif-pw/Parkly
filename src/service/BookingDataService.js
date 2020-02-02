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

class BookingDataService {

    retrieveAllBookings() {
        if (AuthenticationService.isUserLoggedIn()) {
            return axios.get(`${API_URL}/booking`, config);
        }
    }
}

export default new BookingDataService()
