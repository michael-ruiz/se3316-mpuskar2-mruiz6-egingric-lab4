import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  async function check(){
    let temp = [];
    let div = document.getElementById('adminProfile');
    await fetch('/user/attributes/all').then(e => e.json()).then(e => temp = e.admin);

    if (temp.includes(user.email)){
      div.style.display = '';
    }

    else{
      div.style.display = 'none';
    }
  }

  async function addAdmin(){
    let newAdmin = document.getElementById('inputAdmin').value; 

    await fetch(`/user/attributes/admin/${newAdmin}`, {
      method: 'PUT'});

    alert('Admin Added');
  }

  async function addDA(){
    let newDA = document.getElementById('inputDA').value; 

    await fetch(`/user/attributes/deactivate/${newDA}`, {
      method: 'PUT'});

    alert('Account Deactivated');
  }

  async function addV(){
    let newV = user.email; 

    await fetch(`/user/attributes/verified/${newV}`, {
      method: 'PUT'});

    alert('Account Verified');
  }

  return (
    isAuthenticated && (
      <div className="profile" onLoad={check}>
        <img src={user.picture} alt={user.nickname}/>
        <p>{user.nickname}</p>
        <h3>Verify Account</h3>
        <button onClick={addV}>Yes</button>
        <div id="adminProfile">
        <h3>Add Admin Account</h3>
          <input id="inputAdmin" type="text" placeholder="email"/>
          <button onClick={addAdmin}>Go</button>
          <h3>Deactivate / Reactivate Account</h3>
          <input id="inputDA" type="text" placeholder="email"/>
          <button onClick={addDA}>Go</button>
        </div>
        <Link to="/"><button>Back</button></Link>
      </div>
    )
  );
};

export default Profile;