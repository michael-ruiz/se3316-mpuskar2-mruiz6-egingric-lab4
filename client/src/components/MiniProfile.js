import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MiniProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  async function checkD(){
    let t = [];
    await fetch('/user/attributes/all').then(e => e.json()).then(e => t = e.deactivated);

    if (t.includes(user.email)){
      alert('Your Account is Deactivated - Contact Site Admin');
      logout({returnTo: window.location.origin});
    }
  }

  async function isAdmin(){
    let temp = [];
    await fetch('/user/attributes/all').then(e => e.json()).then(e => temp = e.admin);

    if (temp.includes(user.email)){
      document.getElementById('admin').className = '';
    }
    else{
      document.getElementById('admin').className = 'hidden';
    }
  }
  isAdmin();
  checkD();

  return (
    isAuthenticated && (
      <div>
        <Link to="/profile"><p>{user.email}</p></Link>
        <div id='admin'>ADMIN</div>
      </div>
    )
  );
};

export default MiniProfile;