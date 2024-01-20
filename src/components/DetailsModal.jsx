import React from 'react';

const DetailsModal = ({ contact, onClose }) => (
  <div className={`modal active`}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Contact Details</h5>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <h6>ID: {contact.id}</h6>
          <h6>Phone: {contact.phone}</h6>
          <h6>Country: {contact.country.name}</h6>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsModal;
