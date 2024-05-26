import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerDetailsModal from './SellerDetailsModal';

const PropertyListBuyer = ({ properties, onDelete, viewType }) => {
  const [error, setError] = useState(null);
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`/api/properties/${propertyId}`);
      onDelete(propertyId);
      setError(null); // Clear error on successful delete
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleInterestedClick = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowSellerDetails(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {viewType === 'seller' ? 'Your Properties' : 'Available Properties'}
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {properties.map((property) => (
          <li key={property._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{property.place}</h5>
              <p>Area: {property.area} sqft</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Hospitals Nearby: {property.hospitalsNearby ? 'Yes' : 'No'}</p>
              <p>Colleges Nearby: {property.collegesNearby ? 'Yes' : 'No'}</p>
            </div>
            {viewType === 'seller' ? (
              <button className="btn btn-danger" onClick={() => handleDelete(property._id)}>Delete</button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleInterestedClick(property._id)}>I'm Interested</button>
            )}
          </li>
        ))}
      </ul>
      {showSellerDetails && (
        <SellerDetailsModal propertyId={selectedPropertyId} onClose={() => setShowSellerDetails(false)} />
      )}
    </div>
  );
};

export default PropertyListBuyer;
