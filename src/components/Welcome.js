import React from "react";
import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import BookingDataService from "../service/BookingDataService";
import Header from "./Header.js"
import Footer from "./Footer.js"
import Histogram from 'react-chart-histogram';
import AuthenticationService from "./AuthenticationService";
import {TransitionGroup} from 'react-transition-group';
import Typical from 'react-typical'
import {connect} from 'react-redux';
import {bookingsLoaded} from "../redux/actions";
import { BeatLoader} from 'react-spinners';
import { Redirect } from 'react-router';

class Welcome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            totBookings: 0,
            bookings: [],
            bookingsShow: [],
            parkings: [],
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
                             setTimeout(() => {
                                   this.props.history.push('/admin');
                              }, 3000)
                   })
    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){
              return(
                  <div className="AdminPage">
                      <Header />
                      <Typical className="welcome1"
                              steps={['Hello', 1000, 'Hello' + ' ' + AuthenticationService.getLoggedInUserName() + '!', 500]}
                              loop={1}
                              wrapper="p"
                            />

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
)(withRouter(Welcome));
