// src/components/PropertyListContainer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import PropertyListBuyer from './PropertyListBuyer';

const socket = io('http://localhost:5000');

const PropertyListContainer = ({pprops}) => {
  const [properties, setProperties] = useState(pprops);
  const [filters, setFilters] = useState({
    place: '',
    minArea: '',
    maxArea: '',
    bedrooms: '',
    bathrooms: '',
    hospitalsNearby: false,
    collegesNearby: false,
  });

  useEffect(() => {
    fetchProperties();
    socket.on('propertyLiked', (data) => {
      console.log(data)
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === data.id ? { ...property, likes: data.likes } : property
        )
      );
    });

    return () => {
      socket.off('propertyLiked');
    };
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/properties', { params: filters });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handlePropertiesUpdate = (updatedProperties) => {
    setProperties(updatedProperties);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Properties</h1>
      <form onSubmit={handleFilterSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Place</label>
            <input
              type="text"
              name="place"
              value={filters.place}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Minimum Area (sqft)</label>
            <input
              type="number"
              name="minArea"
              value={filters.minArea}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Maximum Area (sqft)</label>
            <input
              type="number"
              name="maxArea"
              value={filters.maxArea}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="hospitalsNearby"
                checked={filters.hospitalsNearby}
                onChange={handleFilterChange}
                className="form-check-input"
                id="hospitalsNearby"
              />
              <label className="form-check-label" htmlFor="hospitalsNearby">
                Hospitals Nearby
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                name="collegesNearby"
                checked={filters.collegesNearby}
                onChange={handleFilterChange}
                className="form-check-input"
                id="collegesNearby"
              />
              <label className="form-check-label" htmlFor="collegesNearby">
                Colleges Nearby
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Apply Filters</button>
      </form>
      <PropertyListBuyer properties={properties} onDelete={fetchProperties} viewType="buyer" onPropertiesUpdate={handlePropertiesUpdate} />
    </div>
  );
};

export default PropertyListContainer;
