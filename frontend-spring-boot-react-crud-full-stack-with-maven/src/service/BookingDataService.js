import axios from 'axios'


const API_URL = 'http://localhost:8080'

class BookingDataService {

    retrieveAllBookings() {
        return axios.get(`${API_URL}/Booking`);
    }
}

export default new BookingDataService()
