import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [newAccount, setNewAccount] = useState({ type: '', solde: '', dateCreation: '' });
    const navigate = useNavigate(); // Remplacer history par navigate

    // Fonction pour créer un compte
    const handleCreate = () => {
        const accountData = { ...newAccount, dateCreation: new Date().toISOString() };

        axios.post("http://localhost:8082/banque/comptes", accountData)
            .then(response => {
                navigate('/'); // Rediriger vers la page principale après l'ajout
            })
            .catch(error => console.error("Erreur lors de la création :", error));
    };

    return (
        <div className="createAccount-container">
            <h1 className="createAccount-header">Créer un Nouveau Compte</h1>

            <div className="createAccount-form">
                <label className="form-label" htmlFor="type">Type de compte</label>
                <select
                    id="type"
                    className="form-input"
                    value={newAccount.type}
                    onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                >
                    <option value="EPARGNE">EPARGNE</option>
                    <option value="COURANT">COURANT</option>
                </select>

                <label className="form-label" htmlFor="solde">Solde initial (€)</label>
                <input
                    id="solde"
                    type="number"
                    placeholder="Entrez le solde"
                    className="form-input"
                    value={newAccount.solde}
                    onChange={(e) => setNewAccount({ ...newAccount, solde: e.target.value })}
                />

                <label className="form-label" htmlFor="dateCreation">Date de création</label>
                <input
                    id="dateCreation"
                    type="date"
                    className="form-input"
                    value={newAccount.dateCreation}
                    onChange={(e) => setNewAccount({ ...newAccount, dateCreation: e.target.value })}
                />

                <button className="createAccount-button" onClick={handleCreate}>Créer</button>
            </div>
        </div>
    );
};

export default CreateAccount;
