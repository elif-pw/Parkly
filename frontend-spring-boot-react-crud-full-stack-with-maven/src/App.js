import './App.css';
import React, {Component} from 'react';
import ParkingList from "./components/ParkingList";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddParking from "./components/AddParking";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import EditParking from "./components/EditParking";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";
// import MapPage from "./components/MapPage";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingList from "./components/BookingList";
import appReducer from "./redux/reducers";

import {Provider} from "react-redux";
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(appReducer, {},
    composeWithDevTools());

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div className="container">
                        <Router>
                            <Switch>
                                <Route exact path="/login">
                                    <LoginPage/>
                                </Route>
                                <AuthenticatedRoute exact path="/admin">
                                    <AdminPage/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/parking">
                                    <ParkingList/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/booking">
                                    <BookingList/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/newparking">
                                    <AddParking/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/editparking/:id">
                                    <EditParking/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/map">
                                    {/*<MapPage/>*/}
                                </AuthenticatedRoute>
                                <AuthenticatedRoute path="/logout" exact component={Logout}/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
