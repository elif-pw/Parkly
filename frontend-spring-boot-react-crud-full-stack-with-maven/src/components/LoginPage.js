import React from "react";
import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Bootstrap from "react-bootstrap";
import logo from "../images/LogoDay.jpg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isValid: false,
        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.validateForm = this.validateForm(this);
        this.handleSubmit = this.handleSubmit(this);
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
      }

    handleSubmit(event) {

    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
        }

    render(){
        return(
            <div className="Login">
                  <div>
                      <img className="loginLogo" src={logo} alt="logo" />
                  </div>
                  <div className = "animdiv">Parkly</div>
                  <div className = "animdiv">
                    <span>is your parking service in Warsaw</span>
                  </div>
                  <form className="loginGroup" onSubmit={this.handleSubmit}>
                    <FormGroup className="field" controlId="username" >
                      <FormLabel className="label">Username</FormLabel>
                      <FormControl
                        className="input"
                        autoFocus
                        type="username"
                        onChange={this.onChangeEvent}
                      />
                    </FormGroup>
                    <FormGroup className="field" controlId="password">
                      <FormLabel className="label">Password</FormLabel>
                      <FormControl className="input" width="auto"
                        onChange={this.onChangeEvent}
                        type="password"
                      />
                    </FormGroup>
                    <Button className="logButton" block bsSize="large" disabled={!this.validateForm} type="submit">
                      Login
                    </Button>
                    <h5>Do not have account? Then join us!</h5><a href="/signup">Sign up.</a>
                  </form>
                </div>
              );
    }
}

export default withRouter(LoginPage)