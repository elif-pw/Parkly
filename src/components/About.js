import React from "react";
import {withRouter} from 'react-router-dom';

import Header from "./Header"
import Footer from "./Footer"

class About extends React.Component{
    render(){
        return(
            <div>
                <Header />
                  <div className="aboutBox">
                     <h3>Parkly is a parking service in Warsaw</h3>
                     <span className="about">It`s goal is to make it easier to control your parking places, spots and bookings.
                     We made it clear for you, so you could see all the important info. Thank you for joining our service. We`are working
                     on getting it better for you!</span>
                  </div>
                <Footer />
            </div>
              );
    }
}

export default withRouter(About)