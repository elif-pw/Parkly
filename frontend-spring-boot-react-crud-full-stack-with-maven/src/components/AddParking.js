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
    {label: "Indoors Parking", value: "Indoors Parking"},
    {label: "Outdoors Parking", value: "Outdoors Parking"},
    {label: "Parking for disabled", value: "Parking for disabled"},
    {label: "Parking for pregnant women", value: "Parking for pregnant women"},
    {label: "Parking for electric cars", value: "Parking for electric cars"},
    {label: "Parking for electric bikes", value: "Parking for electric bikes"}
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

class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            district: '',
            address: '',
            price: '',
            description: [],
            nspots: '',
            is247: false


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedChanged = this.handleSelectedChanged.bind(this);
        this.handleUnselectItem = this.handleUnselectItem.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
    }

    generateid() {
        (Date.now().toString(36) + Math.random().toString(36).substr(1, 24)).toLowerCase()
    }

    handleFormSubmit = event => {
        this.setState({id: this.generateid()});
        event.preventDefault();
        let parking = [{
            "id": this.state.id,
            "name": this.state.name,
            "district": this.state.district,
            "address": this.state.address,
            "description": this.state.description,
            "price": this.state.price,
            "nspots": this.state.nspots,
            "is247": this.state.is247
        }]
        ParkingDataService.createParking(parking)
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
        this.setState({description});
    };
    handleUnselectItem = (removedVal) => () => (
        this.setState({
            description: this.state.description
                .filter(option => option !== removedVal)
        })
    )


    renderSelected = (selected, options) => {

        return (
            <div style={styles.wrapper}>
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
        const {description} = this.state;
        return (
            <div>
                <Header/>
                <form className="newParkingForm" onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3>Parking Details</h3>
                        <input className="input"
                               type="text"
                               name='name'
                               placeholder=" Enter the name"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/>
                        <br/>
                        <input className="input"
                               type="text"
                               name='district'
                               placeholder=" Enter the district"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/><br/>

                        <input className="input"
                               type="text"
                               name='adress'
                               placeholder=" Enter the address"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/>
                        <br/>
                        <input className="input"
                               type="number"
                               name='price'
                               min="1"
                               placeholder=" Enter the price"
                               onChange={this.onChangeEvent}
                               required
                        />


                        <br/><br/>

                        <input className="input"
                               type="number"
                               name='nspots'
                               min="1"
                               placeholder=" Enter the number of spots"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/><br/>
                        <label>Open 24/7</label>
                        <input type="checkbox" name="is247"

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
                        <div>
                            <button type="submit" className="button1" onClick={this.handleFormSubmit}>Create</button>
                            <br/><br/>
                            <Link to="/Parking">
                                <button type="button" className="button2"
                                        onClick={() => this.props.history.push("/")}>Cancel
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
