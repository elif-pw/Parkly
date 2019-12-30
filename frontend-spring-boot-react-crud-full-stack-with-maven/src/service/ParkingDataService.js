import axios from 'axios'


const API_URL = 'http://localhost:8080'

class ParkingDataService {

    retrieveAllParkings() {
        console.log('executed service')
        return axios.get(`${API_URL}/Parking`);
        // { headers: { authorization: 'Basic ' + window.
        //         btoa("root" + ":" + "root") }});

    }

    createParking(parking){
        return axios.post(`${API_URL}/Parking`, parking);
    }
}

export default new ParkingDataService()
