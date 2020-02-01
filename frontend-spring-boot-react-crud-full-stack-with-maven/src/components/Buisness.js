import React from "react";
import {withRouter} from 'react-router-dom';
import Header from "./Header"
import Footer from "./Footer"

class Business extends React.Component{
    render(){
        return(
            <div>
                <Header />
                  <div className="aboutBox">
                     <h3>Commercial info</h3>
                     <span className="about">Here we could put information about possible cooperation, but since this work is made with the only goal
                     to LEARN, we didn`t do that :)</span>
                  </div>
                <Footer />
            </div>
              );
    }
}

export default withRouter(Business)