import logo from './logo.svg';
import './App.css';
import Booking from "./components/Booking";
import React, { Component } from 'react';
import ParkingList from "./components/ParkingList";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddParking from "./components/AddParking";

class App extends Component {
    render() {
        return (
            <div className="App">

                <div id="wrapperHeader">
                    <div id="header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>

                </div>

                <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/Booking">
                            <Booking/>
                        </Route>
                        <Route exact path="/Parking">
                            <ParkingList/>
                        </Route>
                        <Route exact path="/newParking">
                            <AddParking/>
                        </Route>
                    </Switch>
                </Router>
            </div>
            </div>
        );
    }
}


export default App;
