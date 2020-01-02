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
                <Header/>
                <form className="newParkingForm" onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3>Parking Details</h3>
                        <input className="input"
                            type="text"
                            name='name'
                            placeholder="Enter Name"
                            onChange={this.onChangeEvent}
                            required
                        />

                        <br/>
                        <br/>
                        <input className="input"
                            type="number"
                            name='price'
                            placeholder="Enter the price"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>

                        <input className="input"
                            type="text"
                            name='adress'
                            placeholder="Enter the address"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        <br/>
                        <input className="input"
                            type="text"
                            name='address'
                            placeholder="Enter the address"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>
                        <label>Opened 24/7</label>
                        <input type="radio" name="is247"
                               onChange={this.onActivityChanged}/>
                        <br/><br/>

                        <input className="input"
                            type="number"
                            name='nspots'
                            placeholder="Enter the number of spots"
                            onChange={this.onChangeEvent}
                            required
                        />

                        {/*add dropdown for the description property*/}


                        <br/><br/>
                        <div>
                        <button type="submit" className="button1" onClick={this.handleFormSubmit}>Create</button>
                        <br/><br/>
                        <Link to="/Parking">
                            <button type="button" className="button2"
                                    onClick={()=>this.props.history.push("/")}>Cancel
                            </button>
                        </Link>
                        </div>
                    </fieldset>
                </form>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(AddParking)
