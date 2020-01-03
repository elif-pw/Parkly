import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Component.css'
import Header from "./Header.js"
import Footer from "./Footer.js"

class EditParking extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: this.props.match.params.id,
            name: '',
            address: '',
            price: '',
            description: '',
            nspots: '',
            is247: ''


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        ParkingDataService.retrieveParking(this.state.id)
            .then(response =>
                this.setState({
                    name: response.data.name,
                    address: response.data.address,
                    price: response.data.price,
                    description: response.data.description,
                    nspots: response.data.nspots,
                    is247: response.data.is247
                })
            );
        console.log(this.state.name);
    }

    handleFormSubmit = event => {
        event.preventDefault();
        let parking = {
            "id": this.state.id,
            "name": this.state.name,
            "address": this.state.address,
            "description": this.state.description,
            "price": this.state.price,
            "nspots": this.state.nspots,
            "is247": this.state.is247
        }
        ParkingDataService.updateParking(this.state.id, parking)
            .then(response=>console.log(response))
            .then(() => this.props.history.push("/parking"));

    };
    handleFormDelete = event => {
        event.preventDefault();
        ParkingDataService.deleteParking(this.state.id)
            .then(() => this.props.history.push("/parking"));
    };


    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onActivityChanged = (e) => {
        this.setState({
            is247: e.target.checked
        });
    }


    render() {
        return (
            <div>
                <Header/>
                <form className="newParkingForm" onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3 className="formtext">Parking Details</h3>
                        <label>Name</label>
                        <br/>
                        <input className="input"
                            type="text"
                            name='name'
                            value={this.state.name}
                            onChange={this.onChangeEvent}
                            required
                        />

                        <br/>
                        <br/>
                        <label>Price</label>
                        <br/>
                        <input className="input"
                            type="number"
                            name='price'
                            value={this.state.price}
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>

                        <label>Address</label>
                        <br/>
                        <input className="input"
                            type="text"
                            name='address'
                            value={this.state.address}
                            onChange={this.onChangeEvent}
                            required
                        />

                        <br/><br/>

                        <label>Nmber of spots</label>
                        <br/>
                        <input className="input"
                            type="number"
                            name='nspots'
                            value={this.state.nspots}
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>

                        <label>Description [soon]</label>
                        <br/><br/>

                        {/*add dropdown for the description property*/}

                        <label>Open 24/7</label>
                        <input
                             type="checkbox" name="is247"

                               defaultChecked={this.state.is247}
                               onChange={this.onActivityChanged}/>
                        <br/><br/>



                        <br/><br/>
                        <button type="submit" className="button1" onClick={this.handleFormSubmit}>Update</button>

                        <button type="submit" className="button3"
                                onClick={this.handleFormDelete}>Delete</button>

                        <Link to="/Parking">
                            <button type="button" className="button2"
                                    onClick={() => this.props.history.push("/parking")}>Cancel
                            </button>
                        </Link>
                    </fieldset>
                </form>
                <Footer/>
            </div>
        );
    }


}

export default withRouter(EditParking)
