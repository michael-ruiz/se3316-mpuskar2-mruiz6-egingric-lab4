import React from 'react';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <div id="titleDiv">
        <ul className="titleList">
          <li className="static">
          <span className="title">Music App</span>
          </li>
          <li className="static">
            <Profile/>
            <LoginButton/>
            <LogoutButton/>
          </li>
          <li className="static">
            <Link to="/privacypolicy"><button>Privacy Policy</button></Link>
          </li>
        </ul>
    </div>
  )
}
