import React from 'react'
import './Component.css'

class Footer extends React.Component{
    render(){
    return(
   <div className="Footer">
       <div className="footer_left"><a href="/advertising">Advertising</a></div>
       <div className="footer_left"><a href="/buisness">Business</a></div>
       <div className="footer_left"><a href="/about">About</a></div>
       <div className="footer_right"><a href="/privacy">Settings</a></div>
       <div className="footer_right"><a href="/settings">Privacy & Terms</a></div>
   </div>
    );
    }
}

export default Footer