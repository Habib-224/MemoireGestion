import "./Menu.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Navigate,
} from "react-router-dom";
import React from "react";
const Menu = () => {
  const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || [];
  const handleLogout = () => {
    
    const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || {};
    userconnect.id = "";
    userconnect.email = "";
    localStorage.setItem("UserOnline", JSON.stringify(userconnect));
    Navigate("/login");
    // Rediriger vers la page de connexion ou une autre page si nécessaire
  };
  console.log("je suis le userconnecter"+userconnect.email);
    return (
      <div className="Menu" id="menu">
        <ul>
          <li>MemoireProjet</li>
          <li>
            <button id="connexion">
              {userconnect.email !== "" ? (
                <Link to="/login" id="connecter" onClick={handleLogout}>
                  Se Deconnecter
                </Link>
              ) : (
                <Link to="/login" id="connecter">
                  Se Connecter
                </Link>
              )}
            </button>
          </li>
        </ul>
      </div>
    );
}
export default Menu;