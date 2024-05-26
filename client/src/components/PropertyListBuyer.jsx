import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import SellerDetailsModal from './SellerDetailsModal';

const socket = io('http://localhost:5000');

const PropertyListBuyer = ({ properties, onDelete, viewType, onPropertiesUpdate }) => {
  const [error, setError] = useState(null);
  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    socket.on('propertyLiked', (data) => {
      onPropertiesUpdate((prevProperties) =>
        prevProperties.map((property) =>
          property._id === data.id ? { ...property, likes: data.likes } : property
        )
      );
    });

    return () => {
      socket.off('propertyLiked');
    };
  }, [onPropertiesUpdate]);

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

  const handleLike = async (propertyId) => {
    try {
      const response = await axios.post(`/api/properties/like/${propertyId}`);
      const updatedProperties = properties.map((property) =>
        property._id === propertyId ? { ...property, likes: response.data.likes } : property
      );
      onPropertiesUpdate(updatedProperties);
      socket.emit('propertyLiked', { id: propertyId, likes: response.data.likes });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
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
              <p>Likes: {property.likes}</p>
            </div>
            <div>
              {viewType === 'seller' ? (
                <button className="btn btn-danger" onClick={() => handleDelete(property._id)}>Delete</button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={() => handleInterestedClick(property._id)}>I'm Interested</button>
                  <button className="btn btn-secondary" onClick={() => handleLike(property._id)}>Like</button>
                </>
              )}
            </div>
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
