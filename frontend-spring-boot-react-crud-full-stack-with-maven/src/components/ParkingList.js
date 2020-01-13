import React, {Component} from "react";
import ParkingDataService from "../service/ParkingDataService";
import {
    Link,
    withRouter
} from "react-router-dom";
import './Component.css'
import Header from "./Header";
import Footer from "./Footer";

class ParkingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parkings: [],
            message: null
        }
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        ParkingDataService.retrieveAllParkings()
            .then(
                response => {
                    this.setState({parkings: response.data})
                }
            )
    }


    render() {
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
                                <th>Address</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Number of Spots</th>
                                <th>24/7</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.parkings.map(
                                    parking =>
                                        <tr key={parking.id}>
                                            <td>{parking.id}</td>
                                            <td>{parking.name}</td>
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


export default withRouter(ParkingList)