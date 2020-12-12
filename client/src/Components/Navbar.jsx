import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <div>
            <div className="navbar">
                <ul>
                    <li><Link to="/home" class="buttons">Home</Link></li>
                    <li><Link to="/login" class="buttons">About</Link></li>
                    <li><Link to="/signup" class="buttons">Services</Link></li>
                    <li><Link to="/account" class="buttons">FeedBack</Link></li>
                    <li><Link to="/articles" class="buttons">Contact</Link></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
