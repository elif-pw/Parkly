import React from 'react'
import logo from "../images/LogoDay.jpg";
import './Component.css'
import AuthenticationService from "./AuthenticationService";
import {Link} from 'react-router-dom'

class Header extends React.Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <div className="Header">
                <nav className="top-menu">
                    <a className="navbar-logo" href="/admin"><img className="headLogo" alt="" src={logo}/></a>
                    <ul className="menu-main">
                        <li><a href="/admin">Main Page</a></li>
                        <li><a href="/parking">Parkings</a></li>
                        <li><a href="/booking">Bookings</a></li>
                        <li><a href="https://www.google.com/maps">Map</a></li>
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn &&
                        <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>
                        </li>}

                    </ul>
                    <div className="userloggedin">
                        <span>Logged in as: </span>
                        <span>{AuthenticationService.getLoggedInUserName()}</span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header