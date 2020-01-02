import logo from './logo.svg';
import './App.css';
import Booking from "./components/Booking";
import React, { Component } from 'react';
import ParkingList from "./components/ParkingList";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddParking from "./components/AddParking";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage.js";
import AdminPage from "./components/AdminPage";



class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <LoginPage/>
                        </Route>
                        <Route exact path="/signup">
                            <SignUpPage />
                        </Route>
                        <Route exact path="/Admin">
                            <AdminPage/>
                        </Route>
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
