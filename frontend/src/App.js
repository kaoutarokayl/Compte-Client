import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";

// Composant App qui affiche la liste des comptes
const App = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();  // Utilisation de useNavigate dans le composant fonctionnel

    useEffect(() => {
        axios.get("/banque/comptes")  // URL relative
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    // Filtrer les comptes en fonction de la recherche
    const filteredData = data.filter(item =>
        String(item.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.type).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Fonction pour supprimer un compte
    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?");
        if (isConfirmed) {
        axios.delete(`/banque/comptes/${id}`)  // URL relative
            .then(() => {
                setData(data.filter(account => account.id !== id)); // Mise à jour locale des données
                navigate('/');  // Rediriger vers la page d'accueil après la suppression
            })
            .catch(error => console.error("Erreur lors de la suppression :", error));
    };}


    return (
        <div className="container">
            <h1 className="header">Liste des Comptes Bancaires</h1>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher par ID ou Type"
                className="searchBar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Tableau des comptes */}
            <table className="accountTable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Solde</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>{item.solde} €</td>
                        <td>{formatDate(item.dateCreation)}</td>
                        <td>
                            <button className="button red" onClick={() => handleDelete(item.id)}>Supprimer</button>
                            <Link to={`/update/${item.id}`} className="button orange">Mettre à jour</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Redirection vers la page d'ajout */}
            <Link to="/create" className="createLink">
                <button className="createButton">Ajouter un Compte</button>
            </Link>
        </div>
    );
};

// Routes du projet
const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/create" element={<CreateAccount />} />
                <Route path="/update/:id" element={<UpdateAccount />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;
