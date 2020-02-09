import React from "react";
import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import BookingDataService from "../service/BookingDataService";
import Header from "./Header.js"
import Footer from "./Footer.js"
import Histogram from 'react-chart-histogram';

import {connect} from 'react-redux';
import {bookingsLoaded} from "../redux/actions";
import { BeatLoader} from 'react-spinners';

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
            isLoading: true,
            isValid: false,
        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.validateForm = this.validateForm(this);
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    componentDidMount() {
            this.setState({isLoading: true})
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
                                   this.setState({isLoading: false})
                               })

    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
            const totIncome = this.state.bookings.reduce((paidAmount, booking ) => paidAmount + booking.paidAmount, 0);
            const labels = ['DEC', 'JAN', 'FEB']; // The default values, so could be seen the dynamics on histogram. Will be changed to proper ones in next updates
            const data = [324, 415, 672];
            const options = {fillColor: '#ffffff', strokeColor: '#2054a0'};
              return(
                  <div className="AdminPage">
                      <Header />
                      {!this.state.isLoading ? <div><div className="leftBlock">
                      <div>
                          <ul className="genInfo">
                          <li className="genblock1">BOOKED SPOTS <h4>{this.state.bookings.length}</h4></li>
                          <li className="genblock2">TOTAL INCOME<h4>{totIncome}zl</h4> </li>
                          <li className="genblock3">TOTAL PARKINGS<h4>{this.state.totParkings}</h4></li>
                          </ul>
                      </div>
                      <label className="blockLabel">LAST BOOKINGS</label>

                      <div className="usersTable">
                          <fieldset>
                              <table className="adminTable">
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
                      </div> </div>:
                      <div className='sweet-loading'>
                           <BeatLoader
                              color={'#2f5fbc'}
                              loading={!this.props.isLoaded}
                           />
                      </div>}
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
