import React, {Component} from "react";
import BookingDataService from "../service/BookingDataService";
import {
    withRouter
} from "react-router-dom";
import './Component.css'
import Header from "./Header";
import Footer from "./Footer";

class BookingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookings: [],
            message: null
        }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        BookingDataService.retrieveAllBookings()
            .then(
                response => {
                    this.setState({bookings: response.data})
                }
            )
    }


    render() {
        return (
            <div>
                <Header/>
                <div className="parkingList">
                    <h3>Bookings</h3>
                    <fieldset>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Parking Id</th>
                                <th>Parking Spot Id</th>
                                <th>User Id</th>
                                <th>Book Date</th>
                                <th>Paid Amount</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.bookings.map(
                                    booking =>
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.parkingId}</td>
                                            <td>{booking.parkingSpotId}</td>
                                            <td>{booking.userId}</td>
                                            <td>{booking.bookDate}</td>
                                            <td>{booking.paidAmount}</td>
                                            <td>{booking.startDate}</td>
                                            <td>{booking.endDate}</td>
                                        </tr>
                                )
                            }
                            </tbody>

                        </table>

                    </fieldset>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default withRouter(BookingList)