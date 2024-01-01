import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";


const Login = () => {
    const [showSecondForm, setShowSecondForm] = useState(false);
    const [id, setId] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({ id: "", email: "" });
    const navigate = useNavigate();

    const handleAddData = () => {
      // je Récupère les données existantes depuis localStorage
        const existingData = JSON.parse(localStorage.getItem("Utilisateur")) || [];
        const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || [];

        // console.log(existingData) pour voir les données du localStorage
        let tailleUtilisateur = existingData.length +1;
        setId(tailleUtilisateur);

        // console.log(tailleUtilisateur)

      // Crée un nouvel objet pour la nouvelle donnée
        const newData = { id: tailleUtilisateur,nom,prenom,email,password};

      // Ajoute la nouvelle donnée aux données existantes
      const updatedData = [...existingData, newData];

      // Met à jour localStorage avec les nouvelles données
      localStorage.setItem("Utilisateur", JSON.stringify(updatedData));

    //   console.log(existingData);

      // Réinitialise les champs après l'ajout
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      // navigate("/Home");
      toggleForm()
    };

    const handleLogin = () => {
      const existingData =
        JSON.parse(localStorage.getItem("Utilisateur")) || [];
      const foundUser = existingData.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        // Utilisateur trouvé, connecté avec succès
        setLoggedIn(true);
        setUserDetails({ id: foundUser.id, email: foundUser.email });
        localStorage.setItem("UserOnline",JSON.stringify({ id: foundUser.id, email: foundUser.email }));
        navigate("/");
        Swal.fire({
          title: "Bienvenu!",
          text: "Connecté avec succès!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        // Aucun utilisateur trouvé ou informations incorrectes
        setLoggedIn(false);
        Swal.fire({
          icon: "error",
          title: "Oops,réessayer",
          text: "Login Ou Mot de Passe Incorrect",
          showConfirmButton: true,
        });
      }
    };

  const toggleForm = () => {
    setShowSecondForm(!showSecondForm);
  };

  return (
    <div className="Login" id="section_login">
      {!showSecondForm ? (
        <form className="form">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit" onClick={handleLogin}>
            Sign in
          </button>

          <p className="signup-link">
            No account?
            <a href="#" onClick={toggleForm}>
              Sign up
            </a>
          </p>
        </form>
      ) : (
        <form className="form">
          <p className="form-title">Create an account</p>
          {/* Formulaire pour s'inscrire */}
          {/* ... */}
          <div className="input-container">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="prenom"
              placeholder="Prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit" onClick={handleAddData}>
            Create Account
          </button>

          <p className="signup-link">
            Already have an account?
            <a href="#" onClick={toggleForm}>
              Sign in
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
