import React, { useState } from 'react';
import axios from 'axios';

const PropertyListSeller = ({ properties, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete(`/api/properties/${propertyId}`);
      onDelete(propertyId);
      setError(null); // Clear error on successful delete
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Properties</h2>
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
            <button className="btn btn-danger" onClick={() => handleDelete(property._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyListSeller;
