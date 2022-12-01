import React from 'react';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';

export default function Title() {
  return (
    <div>
        <table>
        <tbody>
          <tr>
            <td>
              <h1>Music App</h1> 
            </td>
            <td></td>
            <td>
              <LoginButton/>
            </td>
            <td>
              <LogoutButton/>
            </td>
          </tr>
          </tbody>
        </table>
    </div>
  )
}
