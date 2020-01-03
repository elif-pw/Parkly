import './App.css';
import React, { Component } from 'react';
import ParkingList from "./components/ParkingList";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddParking from "./components/AddParking";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import EditParking from "./components/EditParking";



class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>
                        <Route exact path="/admin">
                            <AdminPage/>
                        </Route>
                        <Route exact path="/parking">
                            <ParkingList/>
                        </Route>
                        <Route exact path="/newparking">
                            <AddParking/>
                        </Route>
                        <Route exact path="/editparking/:id">
                            <EditParking/>
                        </Route>
                    </Switch>
                </Router>
            </div>
            </div>
        );
    }
}

export default App;
