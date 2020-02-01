import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import logo from "../images/LogoDay.jpg";
import AuthenticationService from "./AuthenticationService";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValid: false,
            hasLoginFailed: false,
            showSuccessMessage: false,
            message: ''
        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/admin`)
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
    }

    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="Login">
                <div>
                    <img className="loginLogo" src={logo} alt="logo"/>
                </div>
                <div className="animdiv">Parkly</div>
                <div className="animdiv">
                    <span>is your parking service in Warsaw</span>
                </div>


                <form className="loginGroup" onSubmit={this.handleSubmit}>
                    {this.state.hasLoginFailed &&
                    <Alert variant="danger" show={true}>
                        Incorrect Username or Password
                    </Alert>}
                    <FormGroup className="field" controlId="username">
                        <FormLabel className="label">Username</FormLabel>
                        <FormControl
                            className="input"
                            autoFocus
                            type="username"
                            name="username"
                            onChange={this.onChangeEvent}
                        />
                    </FormGroup>
                    <FormGroup className="field" controlId="password">
                        <FormLabel className="label">Password</FormLabel>
                        <FormControl
                            className="input"
                            width="auto"
                            name="password"
                            onChange={this.onChangeEvent}
                            type="password"
                        />
                    </FormGroup>
                    <Button className="logButton" size="large" disabled={!this.validateForm} type="submit">
                        Login
                    </Button>
                </form>


            </div>
        );
    }
}

export default withRouter(LoginPage)