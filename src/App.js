import logo from './logo.svg';
import './App.css';
import User_Espace from './Espace_user/User_Espace';
import React, { useState } from "react"; 
import Menu from './Header/Menu';
import Home from './Accueil/Home'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Login from './Authentification/Login';


function App() {
  return (
    <Router>
      {/* <Menu></Menu> */}
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
} 
export default App;