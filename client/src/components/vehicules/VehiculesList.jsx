import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isConnected } from "../../utils/auth";
import VehiculeForm from "./VehiculeForm";
const baseURI = import.meta.env.VITE_API_BASE_URL;

function VehiculesList() {
    const navigate = useNavigate();
    const [vehicules, setVehicules] = useState([]);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [vehiculeToDelete, setVehiculeToDelete] = useState(null);
    const [clients, setClients] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicule, setCurrentVehicule] = useState({
        marque: '',
        modele: '',
        annee: '',
        client_id: null,
    });

    const fetchClients = async () => {
        try {
            const response = await fetch(baseURI + 'api/clients', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!isConnected(response, navigate)) {
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setClients(data);
            } else {
                alert('Erreur lors de la récupération des clients');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };
    const fetchVehicules = async () => {
        try {
            const response = await fetch(baseURI + 'api/vehicules', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!isConnected(response, navigate)) {
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setVehicules(data);
            } else {
                alert('Erreur lors de la récupération des vehicules');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    useEffect(() => {
        fetchVehicules();
        fetchClients();
    
    }, []);

    const handleSaveOrUpdateVehicule = async () => {
        const error = handleValidateVehicule();
        if (error) {
            alert(error);
            return;
        }
        if (isEditing) {
            try {
                const response = await fetch(baseURI + `api/vehicules/${currentVehicule.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentVehicule),
                    credentials: 'include'
                });
                if (response.ok) {
                    alert('Vehicule mis à jour avec succès');
                    closeFormModal();
                    await fetchVehicules();
                } else {
                    alert('Erreur lors de la mise à jour du vehicule');
                }
            } catch (error) {
                alert('Erreur réseau');
            }
        } else {
            try {
                const response = await fetch(baseURI + 'api/vehicules', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(currentVehicule),
                    credentials: 'include'
                });
                if (response.ok) {
                    alert('Vehicule ajouté avec succès');
                    closeFormModal();
                    await fetchVehicules();
                } else {
                    alert('Erreur lors de l\'ajout du vehicule');
                }
            } catch (error) {
                alert('Erreur réseau');
            }
        }
    };

    const handleValidateVehicule = () => {
        if (!currentVehicule.marque || !currentVehicule.modele || !currentVehicule.annee) {
            return 'Veuillez remplir tous les champs obligatoires';
        }
        if (!currentVehicule.marque.trim()) return 'Le champ marque est obligatoire';
        if (!currentVehicule.modele.trim()) return 'Le champ modele est obligatoire';
        if (!/^\d{4}$/.test(currentVehicule.annee)) return "Année doit être YYYY";
        if (currentVehicule.annee < 1900 || currentVehicule.annee > 9999) return "Année doit etre comprise entre 1900 et 9999";
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentVehicule(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDeleteConfirmation = (vehiculeId) => {
        setVehiculeToDelete(vehiculeId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteVehicule = async () => {
        try {
            const response = await fetch(baseURI + `api/vehicules/${vehiculeToDelete}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                alert('Vehicule supprimé avec succès');
                setIsDeleteModalOpen(false);
                setVehiculeToDelete(null);
                await fetchVehicules();
            } else {
                alert('Erreur lors de la suppression du vehicule');
            }
        } catch (error) {
            alert('Erreur réseau');
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setVehiculeToDelete(null);
    };

    const openModal = (action, vehicule = null) => {
        if (action === 'edit' && vehicule) {
            setIsEditing(true);
            setCurrentVehicule(vehicule);
        } else if (action === 'add') {
            setIsEditing(false);
            setCurrentVehicule({ marque: '', modele: '', annee: '', client_id: null });
        }
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setCurrentVehicule({ marque: '', modele: '', annee: '', client_id: null });
    };
    
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="fw-bold text-primary">Liste des Vehicules</h1>
                <button className="btn btn-success" onClick={() => openModal('add')}>+</button>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Plaque</th>
                        <th scope="col">Marque</th>
                        <th scope="col">Modele</th>
                        <th scope="col">Année</th>
                        <th scope="col">Client</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicules.map((vehicule) => (
                        <tr key={vehicule.id}>
                            <td>{vehicule.id}</td>
                            <td>{vehicule.marque}</td>
                            <td>{vehicule.modele}</td>
                            <td>{vehicule.annee}</td>
                            <td>
                                {vehicule.client_id ? (
                                    <span>{vehicule.firstname} {vehicule.lastname}</span>
                                ) : (
                                    <span>Non assigné</span>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => openModal('edit', vehicule)}>Modifier</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteConfirmation(vehicule.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isFormModalOpen && (
                <VehiculeForm
                    isOpen={isFormModalOpen}
                    onClose={closeFormModal}
                    actionTitle={isEditing ? 'Modifier' : 'Ajouter'}
                    vehiculeData={currentVehicule || {}}
                    clientsList={clients}
                    onInputChange={handleInputChange}
                    onFormSubmit={handleSaveOrUpdateVehicule}
                />
            )}

            {isDeleteModalOpen && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmer la suppression</h5>
                                    <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Êtes-vous sûr de vouloir supprimer ce véhicule?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Annuler</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteVehicule}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={closeDeleteModal}></div>
                </>
            )}
        </div>
    )
}

export default VehiculesList;