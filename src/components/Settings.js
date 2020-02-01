import React from "react";
import {withRouter} from 'react-router-dom';

import Header from "./Header"
import Footer from "./Footer"

class Settings extends React.Component{
    render(){
        return(
            <div>
                <Header />
                  <div className="aboutBox">
                     <h3>Settings Page, where account details can be changed. Will be added in further updates.</h3>

                  </div>
                <Footer />
            </div>
              );
    }
}

export default withRouter(Settings)