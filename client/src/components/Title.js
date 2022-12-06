import React from 'react';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';
import { Link } from "react-router-dom";
import MiniProfile from './MiniProfile';

export default function Title() {
  return (
    <div id="titleDiv">
        <ul className="titleList">
          <li className="static">
          <span className="title">Music App</span>
          </li>
          <li className="static">
            <MiniProfile/>
            <LoginButton/>
            <LogoutButton/>
          </li>
          <li className="static">
            <Link to="/privacypolicy"><button>Privacy Policy</button></Link>
            <Link to="/AUP"><button>Acceptable Use Policy</button></Link>
            <Link to="/DMCA"><button>DMCA</button></Link>
          </li>
        </ul>
    </div>
  )
}
