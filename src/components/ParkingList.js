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

import  {Row, Col, Input }from 'reactstrap';

class ParkingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading:true,
            filtered : [],
            filter:false,
        }

        this.refresh = this.refresh.bind(this)
        this.handleSearch = this.handleSearch.bind(this);
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

    handleSearch(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            this.setState({filter:true});
            currentList = this.props.parkings;
            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase();
                const lc2 = item.city.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter) || lc2.includes(filter);
            });
        } else {

            newList = this.props.parkings;
        }
        this.setState({
            filtered: newList
        });
    }



    render() {
        var {parkings} = this.props;
        if(this.state.filter==true){
            parkings=this.state.filtered;
        }

            return (
            <div>
                <Header/>
                <Row>
                        <Col className="searchField">
                            <Input type="text" className='search-input' onChange={this.handleSearch} placeholder="Search by name or city..." />
                        </Col>
                </Row>

                <div className="parkingList">
                    <h3>Parkings</h3>
                    <fieldset>
           
             
             {
                      parkings &&  parkings.map(
                                    parking =>
                <div>

                <div className="parkingBlock">
                <div className="smallParkingBlock">
                <b><label className="parkingLabel">ID: </label>
                {parking.id}</b>
                <br/>
                <b><label className="parkingLabel">Name: </label>
                {parking.name}</b>
                <br/>
                <b><label className="parkingLabel">City: </label>
                {parking.city}</b>
                <br/>
                <b><label className="parkingLabel">ZIP: </label>
                {parking.zip}</b>
                <br/>
                <b><label className="parkingLabel">Price:</label>
                {parking.price}</b>
                </div>

                <div className="smallParkingBlock">  
                <b><label className="parkingLabel">24/7:</label>
                {parking.is247 ? "yes" : "no"}</b>
                <br/>
                <b><label className="parkingLabel">Number of Spots:</label>
                {parking.nspots}</b>
                <br/>
                <b><label className="parkingLabel">Description:</label>
                {parking.description}</b>
                </div>
                <div className="smallParkingBlock">
                <Link to={"/editparking/" + parking.id}>
                <b><button className="btn btn-danger" style={{marginLeft: '60px', width: '70px', float: "right"}}>Edit</button></b>
                </Link>
                </div>
                    
                </div>
                <br/>
                </div>
           
              )}


                       
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