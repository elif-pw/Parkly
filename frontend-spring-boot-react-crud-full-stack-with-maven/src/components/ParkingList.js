import React, {Component} from "react";
import ParkingDataService from "../service/ParkingDataService";
import {
    Link,
    withRouter
} from "react-router-dom";
import './Component.css'
import Header from "./Header";
import Footer from "./Footer";

import {connect} from 'react-redux';
import {parkingsLoaded} from "../redux/actions";

import { BeatLoader} from 'react-spinners';

class ParkingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading:true
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
            .then(response => response.data)
            .then(parkings => {
                    this.props.parkingsLoaded(parkings);
                }
            )

    }


    render() {
        const {parkings} = this.props;
        return (
            <div>
                <Header/>
                <div className="parkingList">
                    <h3>Parkings</h3>
                    <fieldset>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>ZIP</th>
                                <th>Address</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Number of Spots</th>
                                <th>24/7</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                parkings && parkings.map(
                                    parking =>
                                        <tr key={parking.id}>
                                            <td>{parking.id}</td>
                                            <td>{parking.name}</td>
                                            <td>{parking.city}</td>
                                            <td>{parking.zip}</td>
                                            <td>{parking.address}</td>
                                            <td>{parking.price}</td>
                                            <td>{parking.description}</td>
                                            <td>{parking.nspots}</td>
                                            <td>{parking.is247 ? "yes" : "no"}</td>
                                            <td><Link to={"/editparking/" + parking.id}>
                                                <button className="btn btn-danger">Edit</button>
                                            </Link></td>
                                            <td>
                                                <button className="btn btn-info">Map</button>
                                            </td>
                                        </tr>
                                )
                            }



                            </tbody>

                        </table>
                            <div className='sweet-loading'>
                                <BeatLoader
                                    color={'#2f5fbc'}
                                    loading={!this.props.isLoaded}
                                />
                            </div>
                        <Link to="/newparking">
                            <button className="btn btn-primary">Create new Parking</button>
                        </Link>
                    </fieldset>
                </div>
                <Footer/>
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