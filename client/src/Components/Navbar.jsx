import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
            <div className="navbar">
                <ul>
                    <li><Link to="/home" className="buttons">Home</Link></li>
                    <li><Link to="/login" className="buttons">About</Link></li>
                    <li><Link to="/signup" className="buttons">Services</Link></li>
                    <li><Link to="/account" className="buttons">FeedBack</Link></li>
                    <li><Link to="/articles" className="buttons">Contact</Link></li>
                    
                </ul>
            </div>
    )
}

export default Navbar;
