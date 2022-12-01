import React from 'react';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';
import Profile from './Profile';

export default function Title() {
  return (
    <div>
        <ul className="titleList">
          <li className="static">
          <span className="title">Music App</span>
          </li>
          <li className="static">
            <Profile/>
            <LoginButton/>
            <LogoutButton/>
          </li>
        </ul>
    </div>
  )
}
