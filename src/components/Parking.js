import React from 'react'
import {
    Link,
    withRouter
} from "react-router-dom";

function Parking(props){
    return(
        <div>
            <div className="parkingBlock">
                <div>
                <div className="smallParkingBlock">
                <p><label className="parkingLabel">ID: </label>
                {props.data.id}</p>
                <p><label className="parkingLabel">Name: </label>
                {props.data.name}</p>
                <p><label className="parkingLabel">City: </label>
                {props.data.city}</p>
                <p><label className="parkingLabel">24/7:</label>
                {props.data.is247 ? "yes" : "no"}</p>
                </div>
                <div className="smallParkingBlock">
                <p><label className="parkingLabel">ZIP: </label>
                {props.data.zip}</p>
                <p><label className="parkingLabel">Description:</label>
                {props.data.description}</p>
                </div>
                <div className="smallParkingBlock">
                <Link to={"/editparking/" + props.data.id}>
                <p><button className="btn btn-danger" style={{marginLeft: '60px', width: '70px', float: "right"}}>Edit</button></p>
                </Link>
                </div>
                </div>
            </div>
            <br />
        </div>
    )
}
export default Parking