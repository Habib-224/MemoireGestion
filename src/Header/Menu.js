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
  // la constante Userconnect recupere l'objet de l'utilisateur Connecté;
  const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || [];

  //La function handleLogout permet de deconnecter un utilisateur connécté 
  const handleLogout = () => {
    const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || {};
    userconnect.id = ""; //remet l'id du user connecter qui se trouve dans le localStorage a chaine vide
    userconnect.email = ""; //remet l'email du user connecter qui se trouve dans le localStorage a chaine vide
    localStorage.setItem("UserOnline", JSON.stringify(userconnect));
    Navigate("/");
    // Rediriger vers la page de connexion ou une autre page si nécessaire
  };

    return (
      <div className="Menu" id="menu">
        <ul>
          <li>MemoireProjet</li>
          <li>
            <button id="connexion">
              {userconnect.email !== "" ? (
                <Link to="/" id="connecter" onClick={handleLogout}>
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