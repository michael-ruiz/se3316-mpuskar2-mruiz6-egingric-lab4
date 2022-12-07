import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MiniProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  async function checkD(){
    let temp = [];
    await fetch('/user/attributes/all').then(e => e.json()).then(e => temp = e.deactivated);

    if (temp.includes(user.email)){
      console.log('yes');
      alert('Your Account is Deactivated');
      logout({returnTo: window.location.origin});
    }
  }

  checkD();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Link to="/profile"><p>{user.email}</p></Link>
      </div>
    )
  );
};

export default MiniProfile;