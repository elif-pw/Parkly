import './App.css';
import React, {Component} from 'react';
import ParkingList from "./components/ParkingList";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AddParking from "./components/AddParking";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import EditParking from "./components/EditParking";
import Buisness from "./components/Buisness";
import Settings from "./components/Settings";
import Privacy from "./components/Privacy"
import Advertising from "./components/Advertising";
import About from "./components/About";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";
// import MapPage from "./components/MapPage";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingList from "./components/BookingList";
import appReducer from "./redux/reducers";

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(appReducer, {},
    composeWithDevTools(applyMiddleware(logger, thunk)));

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div className="cont">
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
                                <AuthenticatedRoute exact path="/buisness">
                                     <Buisness />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/privacy">
                                     <Privacy />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/settings">
                                     <Settings />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/advertising">
                                     <Advertising />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute exact path="/about">
                                     <About />
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
