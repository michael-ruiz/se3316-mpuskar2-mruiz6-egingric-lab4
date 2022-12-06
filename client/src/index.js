import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from './components/PrivacyPolicy';
import DMCA from './components/DMCA';
import AUP from './components/AUP';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="michael-ruiz.us.auth0.com"
    clientId="MFv08zdXjemknnbIy8GJGbRiucLIlnMC"
    redirectUri={window.location.origin}>
    <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="privacypolicy" element={<PrivacyPolicy/>}/>
      <Route path="AUP" element={<AUP/>}/>
      <Route path="DMCA" element={<DMCA/>}/>
    </Routes>
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
