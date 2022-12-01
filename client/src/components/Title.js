import React from 'react';
import LoginButton from './LoginButton'

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
          </tr>
          </tbody>
        </table>
    </div>
  )
}
