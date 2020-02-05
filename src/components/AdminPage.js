import React from "react";
import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import BookingDataService from "../service/BookingDataService";
import Header from "./Header.js"
import Footer from "./Footer.js"
import Histogram from 'react-chart-histogram';

import {connect} from 'react-redux';
import {bookingsLoaded} from "../redux/actions";

class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            totBookings: 0,
            bookings:[],
            bookingsShow:[],
            parkings:[],
            totParkings: 0,
            isValid: false,
        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.validateForm = this.validateForm(this);
        this.handleSubmit = this.handleSubmit(this);
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
      }

    handleSubmit(event) {

    }
    componentDidMount() {
           this.refresh();
    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
        }
    refresh() {
       BookingDataService.retrieveAllBookings()
       .then(
              response => {
                  this.setState({bookings: response.data})
                  this.setState({bookingsShow: response.data[1,5]})
                  this.setState({totBookings: this.state.bookings.length})
                  this.props.bookingsLoaded(response.data);
               }
           )
        ParkingDataService.retrieveAllParkings()
                    .then(response => {
                        this.setState({parkings: response.data})
                        this.setState({totParkings: this.state.parkings.length})
                    })
    }
    render(){
            const totIncome = this.state.bookings.reduce((paidAmount, booking ) => paidAmount + booking.paidAmount, 0);
            const labels = ['DEC', 'JAN', 'FEB']; // The default values, so could be seen the dynamics on histogram. Will be changed to proper ones in next updates
            const data = [324, 415, 672];
            const options = {fillColor: '#ffffff', strokeColor: '#2054a0'};
              return(
                  <div className="AdminPage">
                      <Header />
                      <div className="leftBlock">
                      <div>
                          <ul className="genInfo">
                          <li className="genblock1">BOOKED SPOTS <h4>{this.state.totBookings}</h4></li>
                          <li className="genblock2">TOTAL INCOME<h4>{totIncome}zl</h4> </li>
                          <li className="genblock3">TOTAL PARKINGS<h4>{this.state.totParkings}</h4></li>
                          </ul>
                      </div>
                      <label className="blockLabel">LAST BOOKINGS</label>

                      <div className="usersTable">
                          <fieldset>
                              <table defaultPageSize = "3" className="adminTable">
                                  <thead>
                                  <tr>
                                      <th>Id</th>
                                      <th>Parking Id</th>
                                      <th>Parking Spot Id</th>
                                      <th>User Id</th>
                                      <th>Paid Amount</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      this.state.bookings.slice(0,3).map(
                                          (booking, index) =>
                                               <tr key={booking.id}>
                                                  <td>{booking.id}</td>
                                                  <td>{booking.parkingId}</td>
                                                  <td>{booking.parkingSpotId}</td>
                                                  <td>{booking.userId}</td>
                                                  <td>{booking.paidAmount}zl</td>
                                              </tr>

                                      )
                                  }
                                  </tbody>
                              </table>
                          </fieldset>
                            </div>
                      </div>
                      <div className="rightBlock">
                          <div><label className="blockLabel">NUMBER OF BOOKINGS PER MONTH</label></div>
                          <Histogram className="hist"
                                xLabels={labels}
                                yValues={data}
                                loader={<div>Loading Chart</div>}
                                width='350'
                                height='350'
                                options={options}
                            />
                      </div>
                      <Footer />
                  </div>
              );
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
)(withRouter(AdminPage));
