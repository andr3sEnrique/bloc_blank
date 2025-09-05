function VehiculeForm({ isOpen, onClose, actionTitle, vehiculeData, clientsList, onInputChange, onFormSubmit }) {
    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{actionTitle} un Vehicule</h1>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="marque" className="form-label">Marque</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="marque"
                                        maxLength="50"
                                        name="marque"
                                        value={vehiculeData.marque || ''}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="modele" className="form-label">Modele</label>
                                    <input
                                        type="text"
                                        maxLength="50"
                                        className="form-control"
                                        id="modele"
                                        name="modele"
                                        value={vehiculeData.modele || ''}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="annee" className="form-label">Année</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="annee"
                                        minLength={4}
                                        maxLength={4}
                                        min={1900}
                                        max={new Date().getFullYear()}
                                        name="annee"
                                        value={vehiculeData.annee || ''}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clientIdSelect" className="form-label">Client</label>
                                    <select
                                        className="form-select form-select-lg mb-3"
                                        aria-label="Large select example"
                                        onChange={onInputChange}
                                        name="client_id"
                                        value={vehiculeData.client_id || ""}
                                        id="clientIdSelect"
                                    >
                                        <option value={""}>Select Client</option>
                                        {clientsList.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.firstname} {client.lastname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >Annuler</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onFormSubmit}
                            >{actionTitle}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
        </>
    );
}

export default VehiculeForm