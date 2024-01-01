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
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // const handleAddData = () => {
  //   // Récupère les données existantes depuis localStorage
  //   const existingData = JSON.parse(localStorage.getItem("mesDonnees")) || [];

  //   // Crée un nouvel objet pour la nouvelle donnée
  //   const newData = { id, nom,prenom,email,password};

  //   // Ajoute la nouvelle donnée aux données existantes
  //   const updatedData = [...existingData, newData];

  //   // Met à jour localStorage avec les nouvelles données
  //   localStorage.setItem("mesDonnees", JSON.stringify(updatedData));

  //   console.log(existingData);

  //   // Réinitialise les champs après l'ajout
  //   setId("");
  //   setNom("");
  //   setPrenom("");
  //   setEmail("");
  //   setPassword("");
  // };

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