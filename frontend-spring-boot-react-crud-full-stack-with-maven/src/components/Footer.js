import React from 'react'
import './Component.css'

class Footer extends React.Component{
    render(){
    return(
   <div className="Footer">
       <div className="footer_left"><a href="#">Advertising</a></div>
       <div className="footer_left"><a href="#">Business</a></div>
       <div className="footer_left"><a href="#">About</a></div>
       <div className="footer_right"><a href="#">Settings</a></div>
       <div className="footer_right"><a href="#">Privacy & Terms</a></div>
   </div>
    );
    }
}

export default Footer