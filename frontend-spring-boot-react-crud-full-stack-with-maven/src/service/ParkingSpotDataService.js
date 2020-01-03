import axios from 'axios'


const API_URL = 'http://localhost:8080'

class ParkingSpotDataService {

    retrieveAllParkingSpots() {
        return axios.get(`${API_URL}/ParkingSpot`);
    }
}

export default new ParkingSpotDataService()
