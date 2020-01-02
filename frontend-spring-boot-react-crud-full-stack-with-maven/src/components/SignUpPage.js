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

class SignUpPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            password_re: '',
            isValid: false,
        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.validateForm = this.validateForm(this);
        this.handleSubmit = this.handleSubmit(this);
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
      }

    checkPassword() {
        if(!this.state.password || this.state.password != this.state.password_re) {
            this.setState({password_has_error:true});
        }
        else {
            this.setState({password_has_error:false});
        }
    }

    handleSubmit(event) {

    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.name == 'password' || event.target.name == 'password_re')
                   this.checkPassword();
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
                        name="login"
                        type="login"
                        onChange={this.onChangeEvent}
                      />
                    </FormGroup>
                    <FormGroup className="field" controlId="password">
                      <FormLabel className="label">Password</FormLabel>
                      <FormControl className="input" name="password"
                        onChange={this.onChangeEvent}
                        type="password"
                      />
                    </FormGroup>
                    <FormGroup className="field" controlId="password">
                       <FormLabel className="label">Repeat password</FormLabel>
                       <FormControl className="input" name="password_re"
                           onChange={this.onChangeEvent}
                           type="password"
                           />
                    </FormGroup>
                    <Button className="logButton" block bsSize="large" disabled={!this.validateForm} type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
              );
    }
}

export default withRouter(SignUpPage)