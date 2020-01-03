import axios from 'axios'


const API_URL = 'http://localhost:8080'

class ParkingDataService {

    retrieveAllParkings() {
        return axios.get(`${API_URL}/Parking`);
    }
    retrieveParking(id){
        return axios.get(`${API_URL}/Parking/${id}`);
    }

    createParking(parking){
        return axios.post(`${API_URL}/Parking`, parking);
    }

    updateParking(id, parking){
        return axios.put(`${API_URL}/Parking/${id}`, parking);
    }
    deleteParking(id){
        return axios.delete(`${API_URL}/Parking/${id}`)
    }



}

export default new ParkingDataService()
