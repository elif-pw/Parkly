import axios from 'axios'


const API_URL = 'http://localhost:8080'

class ParkingDataService {

    retrieveAllParkings() {
        console.log('executed service')
        return axios.get(`${API_URL}/ParkingSpot`);
        // { headers: { authorization: 'Basic ' + window.
        //         btoa("root" + ":" + "root") }});

    }
}

export default new ParkingDataService()
