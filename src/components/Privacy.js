import React from "react";
import {withRouter} from 'react-router-dom';

import Header from "./Header"
import Footer from "./Footer"

class Privacy extends React.Component{
    render(){
        return(
            <div>
                <Header />
                  <div className="aboutBox">
                     <h3>Privacy Page, where the information concerning privacy of the service is stated. Will be added in further updates.</h3>
                  </div>
                <Footer />
            </div>
              );
    }
}

export default withRouter(Privacy)