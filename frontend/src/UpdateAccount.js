import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const UpdateAccount = () => {
    const { id } = useParams(); // Récupère l'ID du compte à mettre à jour
    const [account, setAccount] = useState({ id: '', type: '', solde: '', dateCreation: '' });
    const navigate = useNavigate();  // Utilisation de navigate au lieu de history

    useEffect(() => {
        axios.get(`http://localhost:8082/banque/comptes/${id}`)
            .then(response => setAccount(response.data))  // Remplir le state avec les données du compte
            .catch(error => console.error("Erreur lors du chargement du compte :", error));
    }, [id]);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {  // Format français
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:8082/banque/comptes/${id}`, account)
            .then(response => {
                navigate('/');  // Rediriger vers la page principale après la mise à jour
            })
            .catch(error => console.error("Erreur lors de la mise à jour :", error));
    };

    return (
        <div className="container">
            <h1 className="header">Mettre à Jour le Compte</h1>

            <div className="createForm">
                <select
                    className="formInput"
                    value={account.type}
                    onChange={(e) => setAccount({ ...account, type: e.target.value })}
                >
                    <option value="EPARGNE">EPARGNE</option>
                    <option value="COURANT">COURANT</option>
                </select>

                <input
                    type="number"
                    placeholder="Solde"
                    className="formInput"
                    value={account.solde}
                    onChange={(e) => setAccount({ ...account, solde: e.target.value })}
                />

                {/* Affichage de la date de création */}
                <input
                    type="date"
                    className="formInput"
                    value={account.dateCreation}
                    onChange={(e) => setAccount({ ...account, dateCreation: e.target.value })}
                />


                <button className="createButton" onClick={handleUpdate}>Mettre à Jour</button>
            </div>
        </div>
    );
};

export default UpdateAccount;
