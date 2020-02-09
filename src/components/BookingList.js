import React, {Component} from "react";
import BookingDataService from "../service/BookingDataService";
import {
    withRouter
} from "react-router-dom";
import './Component.css'
import Header from "./Header";
import Footer from "./Footer";
import {bookingsLoaded} from "../redux/actions";
import {connect} from "react-redux";
import {BeatLoader} from "react-spinners";

class BookingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            filtered:[],
            isfuture:false
        }
        this.refresh = this.refresh.bind(this);
        this.handlefilter=this.handlefilter.bind(this);
    }

    refresh() {
        BookingDataService.retrieveAllBookings()
            .then(response =>response.data)
            .then(bookings=>{
                this.props.bookingsLoaded(bookings);
            })
    }

    componentDidMount() {
        if (!this.props.isBookingLoaded) {
            this.refresh();
        }
    }

    handlefilter(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });

        let currentList = this.props.bookings;
        let newList = currentList.filter
        (
            booking=>new Date(booking.startDate)-new Date>0
        )

        this.setState({filtered:newList});
    }


    render() {
        let {bookings}=this.props;
        if (this.state.isfuture==true){
            bookings=this.state.filtered;
        }
        return (
            <div>
                <Header/>
                
                <div className="isFuture">
                <label>
          Upcoming:
          <input
            className= "checkmark"
            name="isfuture"
            type="checkbox"
            checked={this.state.isfuture}
            onChange={this.handlefilter} />
        </label>
        </div>

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
                            { bookings &&
                                bookings.map(
                                    booking =>
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.parkingId}</td>
                                            <td>{booking.parkingSpotId}</td>
                                            <td>{booking.userId}</td>
                                            <td>{new Date(booking.bookDate).getDate()+"-"
                                            +new Date(booking.bookDate).getMonth()
                                            +"-"+ new Date(booking.bookDate).getFullYear()+"    "
                                            +new Date(booking.bookDate).getHours()
                                            +":"+ new Date(booking.bookDate).getMinutes()}</td>
                                            <td>{booking.paidAmount}</td>

                                            <td>{new Date(booking.startDate).getDate()+"-"
                                            +new Date(booking.startDate).getMonth()
                                            +"-"+ new Date(booking.startDate).getFullYear()+"    "
                                            +new Date(booking.startDate).getHours()
                                            +":"+ new Date(booking.startDate).getMinutes()}</td>

                                            <td>{new Date(booking.endDate).getDate()+"-"
                                            +new Date(booking.endDate).getMonth()
                                            +"-"+ new Date(booking.endDate).getFullYear()+"    "
                                            +new Date(booking.endDate).getHours()
                                            +":"+ new Date(booking.endDate).getMinutes()}</td>
                                        </tr>
                                )
                            }
                            </tbody>

                        </table>
                        <div className='sweet-loading'>
                            <BeatLoader
                                color={'#2f5fbc'}
                                loading={!this.props.isBookingLoaded}
                            />
                        </div>

                    </fieldset>
                </div>
                <Footer/>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        bookings: state.bookings,
        isBookingLoaded: state.isBookingLoaded,
    };
};
const mapDispatchToProps = (dispatch) => ({
    bookingsLoaded: bookings => dispatch(bookingsLoaded(bookings))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BookingList));