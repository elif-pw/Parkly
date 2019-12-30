import React, {Component} from "react";
import ParkingDataService from "../service/ParkingDataService";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import './Component.css'

class ParkingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parkings: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        ParkingDataService.retrieveAllParkings()
            .then(
                response => {
                    console.log(response);
                    this.setState({ parkings: response.data })

                }
            )
    }


    render() {
        return (
            <div>
                <Link to="/newParking">
                    <button >Create new Parking</button>
                </Link>



            <div className="container">
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
                                        <td>{parking.is247}</td>
                                    </tr>

                            )
                        }
                        </tbody>
                    </table>
                    </fieldset>

            </div>
            </div>
        )
    }
}


export default withRouter(ParkingList)