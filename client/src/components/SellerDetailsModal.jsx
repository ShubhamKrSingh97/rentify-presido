// src/components/SellerDetailsModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerDetailsModal = ({ propertyId, onClose }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/seller`);
        setSeller(response.data);
      } catch (error) {
        setError('Error fetching seller details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [propertyId]);

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seller Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {seller && (
              <>
                <p><strong>Name:</strong> {seller.firstname} {seller.lastname}</p>
                <p><strong>Email:</strong> {seller.email}</p>
                <p><strong>Phone:</strong> {seller.phone}</p>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailsModal;
