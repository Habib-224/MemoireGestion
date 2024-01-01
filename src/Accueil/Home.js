import Menu from "../Header/Menu";
import React, { useState } from "react";
import "./Home.css";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
const Home = () => {
  const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || [];
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [contexte, setContexte] = useState("");
  const [problematique, setProblematique] = useState("");
  const [domaine, setDomaine] = useState("informatique");
    const [selectedMemoire, setSelectedMemoire] = useState(null);
  const MemoireAjout = JSON.parse(localStorage.getItem("Memoire")) || [];

  
  const generatePDF = (id) => {
    const doc = new jsPDF();
    const userconnect = JSON.parse(localStorage.getItem("UserOnline")) || [];
    const MemoireDonwload = JSON.parse(localStorage.getItem("Memoire")) || [];
    const foundMemoire = MemoireDonwload.find((memoire) => memoire.id === id);

    if (foundMemoire) {
      doc.text(`Ce Memoire a été publié par :${userconnect.email}`, 10, 10);
      doc.text(`Domaine: ${foundMemoire.domaine}`, 10, 25);
      doc.text(`Titre: ${foundMemoire.titre}`, 10, 40);

      // Split du texte potentiellement long pour revenir à la ligne
      const maxWidth = 180; // Largeur maximale avant le retour à la ligne
      const descriptionLines = doc.splitTextToSize(`Description: ${foundMemoire.description}`,maxWidth);
      descriptionLines.forEach((line, index) => {
        doc.text(line, 10, 50 + index * 10);
      });

      const ContexteLines = doc.splitTextToSize(
        `Contexte: ${foundMemoire.contexte}`,
        maxWidth
      );
      ContexteLines.forEach((line, index) => {
        doc.text(line, 10, 95 + index * 10);
      });

      const ProblematiqueLines = doc.splitTextToSize(
        `Problematique: ${foundMemoire.problematique}`,
        maxWidth
      );
      ProblematiqueLines.forEach((line, index) => {
        doc.text(line, 10, 130 + index * 10);
      });
     
      // Télécharger le PDF
      doc.save("donnees-utilisateur.pdf");
    }
  };

  var memoiretrouve;
  const DetailMemoire = (id) => {
    // alert(id);
    const MemoireId = JSON.parse(localStorage.getItem("Memoire")) || [];
    const foundMemoire = MemoireId.find((memoire) => memoire.id === id);

    if (foundMemoire) { 
      
     setSelectedMemoire(foundMemoire);
    }

    //  console.log("ID du mémoire récupéré :", id);
  };
  
  const handleMemoire = () => {
    const MemoireAjout = JSON.parse(localStorage.getItem("Memoire")) || [];
    let TailleMemoire = MemoireAjout.length + 1;

    // Crée un nouvel objet pour la nouvelle donnée
    const newData = { id:TailleMemoire, titre, description, contexte, problematique, domaine,createdby:userconnect.email };

    // Ajoute la nouvelle donnée aux données existantes
    const updatedData = [...MemoireAjout, newData];

    // Met à jour localStorage avec les nouvelles données
    localStorage.setItem("Memoire", JSON.stringify(updatedData));
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrer les mémoires en fonction du terme de recherche
  const filteredMemoires = MemoireAjout.filter((memoire) =>
    memoire.domaine.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return (
      <div className="Home">
        <Menu></Menu>
        {userconnect.email !== "" && (
          <button
            id="publierMemoire"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            // onClick={generatePDF}
          >
            Publier un Memoire
          </button>
        )}

        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Rechercher un mémoire par domaine"
          value={searchTerm}
          onChange={handleSearch}
          id="Search"
        />

        <div id="Container_card">
          {filteredMemoires.map((memoire) => (
            <div class="card" key={memoire.id}>
              <div class="header" id="titre">
                {memoire.domaine}
              </div>
              <div class="info">
                <p class="title">{memoire.titre}</p>
                <p class="">Publié par {memoire.createdby}</p>
              </div>
              <div class="footer">
                {userconnect.email !== "" && (
                  <button
                    type="button"
                    class="action"
                    // onClick={() => handleGetId(memoire.id)}
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                    onClick={() => generatePDF(memoire.id)}
                  >
                    {" "}
                    Telecharger
                  </button>
                )}
                <button
                  type="button"
                  class="action"
                  onClick={() => DetailMemoire(memoire.id)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  {" "}
                  Voir
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Detail Memoire
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {/* <p>{memoiretrouve.titre}</p> */}
                <p>Titre: {selectedMemoire?.titre}</p>
                <p>Contexte: {selectedMemoire?.contexte}</p>
                <p>Description: {selectedMemoire?.description}</p>
                <p>Problematique: {selectedMemoire?.problematique}</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Pop up qui permet d'ajouter un memoire */}
        <div
          class="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Ajout Memoire
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form className="form1" id="Modal_input">
                  <div className="input-container1">
                    <input
                      type="text"
                      name="titre"
                      placeholder="Titre"
                      value={titre}
                      onChange={(e) => setTitre(e.target.value)}
                    />
                  </div>
                  <div className="input-container1">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="input-container1">
                    <input
                      type="text"
                      name="contexte"
                      placeholder="Contexte"
                      value={contexte}
                      onChange={(e) => setContexte(e.target.value)}
                    />
                  </div>
                  <div className="input-container1">
                    <input
                      type="text"
                      name="problematique"
                      placeholder="Problematique"
                      value={problematique}
                      onChange={(e) => setProblematique(e.target.value)}
                    />
                  </div>
                  <select
                    name="domaine"
                    value={domaine}
                    onChange={(e) => setDomaine(e.target.value)}
                    id="option"
                  >
                    <option value="">Sélectionnez un domaine</option>
                    <option value="Psychologie">Psychologie</option>
                    <option value="Économie et finance">
                      Économie et finance
                    </option>
                    <option value="Marketing et publicité">
                      Marketing et publicité
                    </option>
                    <option value="Médecine et santé">Médecine et santé</option>
                    <option value="Sciences politiques">
                      Sciences politiques
                    </option>
                    {/* Ajoutez d'autres options de domaine ici si nécessaire */}
                  </select>
                  <button
                    type="submit"
                    className="submit1"
                    onClick={handleMemoire}
                    id="button_publier"
                  >
                    Publier
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Home;