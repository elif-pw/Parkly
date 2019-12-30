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

class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: '',
            name: '',
            address:'',
            price:'',
            description:'',
            nspots:'',
            is247: false


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    generateid() {
        (Date.now().toString(36) + Math.random().toString(36).substr(1, 24)).toLowerCase()
    }

    handleFormSubmit=event=> {
        this.setState({id: this.generateid()});
        event.preventDefault();
        let parking= [{
                "id": this.state.id,
                "name": this.state.name,
                "address": this.state.address,
                "description": this.state.description,
                "price": this.state.price,
                "nspots": this.state.nspots,
                "is247":this.state.is247
            }]
        ParkingDataService.createParking(parking)
            .then(()=>this.props.history.push("/Parking"));

    };


    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onActivityChanged = (e) => {
        this.setState({
            is247: e.currentTarget.value
        });
    }



    render() {
        return (
            <div>
                <Link to="/Parking">
                    <button type="button"
                            onClick={()=>this.props.history.push("/")}>Back
                    </button>
                </Link>
                <form className="container" onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3 className="formtext">Parking Details</h3>

                        <input
                            type="text"
                            name='name'
                            placeholder="Enter Name"
                            onChange={this.onChangeEvent}
                            required
                        />

                        <br/>
                        <br/>
                        <input
                            type="number"
                            name='price'
                            placeholder="Enter the price"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>

                        <input
                            type="text"
                            name='adress'
                            placeholder="Enter the address"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        <br/>
                        <input
                            type="text"
                            name='address'
                            placeholder="Enter the address"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>
                        <label>Is it open 24/7?</label>
                        <input type="radio" name="is247"
                               onChange={this.onActivityChanged}/>
                        <br/><br/>

                        <input
                            type="number"
                            name='nspots'
                            placeholder="Enter the number of spots"
                            onChange={this.onChangeEvent}
                            required
                        />

                        {/*add dropdown for the description property*/}


                        <br/><br/>
                        <button type="submit" onClick={this.handleFormSubmit}>Create</button>
                        <br/><br/>
                        <Link to="/Parking">
                            <button type="button"
                                    onClick={()=>this.props.history.push("/")}>Cancel
                            </button>
                        </Link>
                    </fieldset>
                </form>
            </div>
        );
    }


}

export default withRouter(AddParking)
