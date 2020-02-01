import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import './Component.css'
import Header from "./Header.js"
import Footer from "./Footer.js"
import MultiSelect from "@khanacademy/react-multi-select";
import Chip from '@material-ui/core/Chip';
import {connect} from "react-redux";
import {addNewParkingwithId} from "../redux/thunk-functions";

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
    MultiSelect: {
        height: 100,
        width: 60
    }
};

class AddParking extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            city: '',
            zip: '',
            address: '',
            district: '',
            price: '',
            description: [],
            nspots: '',
            is247: false,
            errormessage: ''


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedChanged = this.handleSelectedChanged.bind(this);
        this.handleUnselectItem = this.handleUnselectItem.bind(this);
        this.renderSelected = this.renderSelected.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation() {
        if (this.state.name === '' ||
            this.state.city === '' || this.state.zip === ''
            || this.state.address === '' || this.state.price === 0
            || this.state.nspots === 0)
            return false;
        return true;
    }


    handleFormSubmit = event => {
        event.preventDefault();

        const parking = {

            "name": this.state.name,
            "city": this.state.city,
            "zip": this.state.zip,
            "address": this.state.address,
            "description": this.state.description.toString(),
            "price": this.state.price,
            "nspots": this.state.nspots,
            "is247": this.state.is247,
            "active": true
        }
        // ParkingDataService.createParking([parking])
        //     .then(response => {
        //         if (response.status === 200) {
        //             this.props.dispatchParkingAdd(parking);
        //             this.props.history.push("/parking");
        //         }
        //     })

        this.handleValidation() ?
            this.props.addNewParkingwithId(parking).then(
                this.props.history.push("/parking"))
            : this.setState({errormessage: "All fields should be filled! Number of spots or the price cannot be 0!"})

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
                {this.state.errormessage &&
                <div className="alert alert-danger">
                    <strong>Error!</strong> {this.state.errormessage}
                </div>
                }
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
                               name='city'
                               placeholder=" Enter the city"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/>
                        <br/>
                        <input className="input"
                               type="text"
                               name='zip'
                               placeholder=" Enter the zip"
                               onChange={this.onChangeEvent}
                               required
                        />

                        <br/><br/>

                        <input className="input"
                               type="text"
                               name='address'
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
                        <label>Open 24/7 </label>
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
                            <button type="submit" className="btn btn-success" onClick={this.handleFormSubmit}>Create
                            </button>
                            <Link to="/Parking">
                                <button type="button" className="btn btn-primary"
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

const mapDispatchToProps = (dispatch) => ({
    addNewParkingwithId: (parking) => dispatch(addNewParkingwithId(parking))
});
export default connect(
    null,
    mapDispatchToProps
)(withRouter(AddParking));
