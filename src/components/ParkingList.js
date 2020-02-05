import React, {Component} from "react";
import ParkingDataService from "../service/ParkingDataService";
import {
    Link,
    withRouter
} from "react-router-dom";
import './Component.css'
import Header from "./Header";
import Footer from "./Footer";
import Parking from "./Parking"

import {connect} from 'react-redux';
import {parkingsLoaded} from "../redux/actions";

import { BeatLoader} from 'react-spinners';

class ParkingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading:true,
            parkings:[]
        }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        if (!this.props.isLoaded) {
            this.refresh();
        }
    }

    refresh() {
        ParkingDataService.retrieveAllParkings()
            .then(response => {
                     this.setState({parkings: response.data})
                }
            )

    }


    render() {
            const parkings = this.state.parkings.map(parking =>
                      <Parking key={parking.id} data={parking}/>
                )
            return (
                <div>
                    <Header />
                    <div className="parkingList">
                        <h3>Parkings</h3>
                        {parkings}
                    </div>
                    <Footer />
                </div>
            )
        }
}


const mapStateToProps = (state) => {
    return {
        parkings: state.parkings,
        isLoaded: state.isLoaded,
    };
};
const mapDispatchToProps = (dispatch) => ({
    parkingsLoaded: parkings => dispatch(parkingsLoaded(parkings))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ParkingList));