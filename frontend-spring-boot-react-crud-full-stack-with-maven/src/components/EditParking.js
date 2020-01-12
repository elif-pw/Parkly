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
import MultiSelect from "@khanacademy/react-multi-select";
import Chip from '@material-ui/core/Chip';

const options = [
    { label: "Indoors Parking", value: "Indoors Parking" },
    { label: "Outdoors Parking", value: "Outdoors Parking" },
    { label: "Parking for disabled", value: "Parking for disabled" },
    { label: "Parking for pregnant women", value: "Parking for pregnant women" },
    { label: "Parking for electric cars", value: "Parking for electric cars" },
    { label: "Parking for electric bikes", value: "Parking for electric bikes" }
];
const styles = {
    chip: {
        margin: 2,
        marginRight: 4,

    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: '100%',


    },
};
class EditParking extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: this.props.match.params.id,
            name: '',
            city:'',
            district:'',
            address: '',
            price: '',
            description: [],
            nspots: '',
            is247: ''


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedChanged=this.handleSelectedChanged.bind(this);
        this.handleUnselectItem=this.handleUnselectItem.bind(this);
        this.renderSelected=this.renderSelected.bind(this);
    }

    componentDidMount() {
        ParkingDataService.retrieveParking(this.state.id)
            .then(response =>
                this.setState({
                    name: response.data.name,
                    city:response.data.city,
                    zip: response.data.zip,
                    address: response.data.address,
                    price: response.data.price,
                  //  description: response.data.description,
                    nspots: response.data.nspots,
                    is247: response.data.is247
                })
            );

    }

    handleFormSubmit = event => {
        event.preventDefault();
        let parking = {
            "id": this.state.id,
            "name": this.state.name,
            "city":this.state.city,
            "zip":this.state.zip,
            "address": this.state.address,
            "description": this.state.description.toString(),
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
    handleSelectedChanged = description => {
        this.setState({ description });
    };
    handleUnselectItem = (removedVal) => () => (
        this.setState({
            description: this.state.description
                .filter(option => option !== removedVal)
        })
    )


    renderSelected = (selected, options) => {
        if (!options.length) {
            return <span>No options available</span>;
        }

        if (!selected.length) {
            return <span>Select options ({options.length} available)</span>;
        }

        if (selected.length === options.length) {
            return <span>All options</span>;
        }

        if (selected.length > 2) {
            return <span>Selected {selected.length} options</span>;
        }
        return (
            <div style={styles.wrapper}>
                {console.log(selected)}
                {selected.map(value => (
                    <Chip
                        key={value}
                        style={styles.chip}
                        label={value}
                        onDelete={this.handleUnselectItem(value)}
                    >
                    </Chip>
                ))}
            </div>
        )
    }


    render() {
        const {description}=this.state;
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
                        <br/><br/>

                        <label>City</label>
                        <br/>
                        <input className="input"
                               type="text"
                               name='city'
                               value={this.state.city}
                               onChange={this.onChangeEvent}
                               required
                        />
                        <br/><br/>


                        <label>ZIP</label>
                        <br/>
                        <input className="input"
                               type="text"
                               name='zip'
                               value={this.state.zip}
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

                        <label>Number of spots</label>
                        <br/>
                        <input className="input"
                            type="number"
                            name='nspots'
                            value={this.state.nspots}
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>


                        <label>Open 24/7  </label>
                        <input
                             type="checkbox" name="is247"

                               defaultChecked={this.state.is247}
                               onChange={this.onActivityChanged}/>
                        <br/><br/>


                        <label>Choose Options</label>
                        <MultiSelect
                            disableSearch={true}
                            options={options}
                            selected={description}

                            valueRenderer={this.renderSelected}
                            onSelectedChanged={this.handleSelectedChanged}

                        />





                        <br/><br/>
                        <button type="submit" className="btn btn-success" onClick={this.handleFormSubmit}>Update</button>

                        <button type="submit" className="btn btn-danger"
                                onClick={this.handleFormDelete}>Delete</button>

                        <Link to="/Parking">
                            <button type="button" className="btn btn-primary"
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
