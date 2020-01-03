import React from 'react'
import logo from "../images/LogoDay.jpg";
import './Component.css'
import Bootstrap from "react-bootstrap";

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
    return(
   <div className="Header">
       <nav className="top-menu">
       <a className="navbar-logo"><img className="headLogo" src={logo}/></a>
              <ul className="menu-main">
              <li><a href="/Admin">Main Page</a></li>
              <li><a href="/Parking">Parkings</a></li>
              <li><a href="/Map">Map</a></li>
              </ul>
              <div className="userloggedin">
              <span>Logged in as: </span>
              <span>Admin Name</span> //this.props.name
              </div>
       </nav>
   </div>
    );
    }
}

export default Header