import React from "react";
import {withRouter} from 'react-router-dom';
import ParkingDataService from "../service/ParkingDataService";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./Header.js"
import Footer from "./Footer.js"
import UsersTable from "./UsersTable.js"
import Histogram from 'react-chart-histogram';


class AdminPage extends React.Component{
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
      const labels = ['2016', '2017', '2018'];
      const data = [324, 45, 672];
      const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
        return(
            <div className="AdminPage">
                <Header />
                <div className="leftBlock">
                <div>
                    <ul className="genInfo">
                    <li className="genblock1">BOOKED SPOTS</li>
                    <li className="genblock2">TOTAL INCOME</li>
                    <li className="genblock3">TOTAL USERS</li>
                    </ul>
                </div>

                <div>
                    <UsersTable  />
                </div>


                </div>
                <div className="rightBlock">
                    <Histogram
                          xLabels={labels}
                          yValues={data}
                          width='300'
                          height='200'
                          options={options}
                      />
                </div>
                <Footer />

            </div>
        );
    }
}

export default withRouter(AdminPage)