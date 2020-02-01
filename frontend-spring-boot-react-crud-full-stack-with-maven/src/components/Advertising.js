import React from "react";
import {withRouter} from 'react-router-dom';

import Header from "./Header"
import Footer from "./Footer"

class Advertising extends React.Component{
    render(){
        return(
            <div>
                <Header />
                  <div className="aboutBox">
                     <h3>Advertising info</h3>
                     <span className="about">:))</span>
                  </div>
                <Footer />
            </div>
              );
    }
}

export default withRouter(Advertising)