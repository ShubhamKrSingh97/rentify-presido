// src/components/PropertyListContainer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyList from './PropertyListSeller';

const PropertyListContainer = () => {
  const [properties, setProperties] = useState([]);
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
          <div className="col-md-2 mb-3">
            <label className="form-label">Min Area (sqft)</label>
            <input
              type="number"
              name="minArea"
              value={filters.minArea}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-3">
            <label className="form-label">Max Area (sqft)</label>
            <input
              type="number"
              name="maxArea"
              value={filters.maxArea}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-3">
            <label className="form-label">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div className="col-md-2 mb-3">
            <label className="form-label">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="hospitalsNearby"
                checked={filters.hospitalsNearby}
                onChange={handleFilterChange}
                className="form-check-input"
              />
              <label className="form-check-label">Hospitals Nearby</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="collegesNearby"
                checked={filters.collegesNearby}
                onChange={handleFilterChange}
                className="form-check-input"
              />
              <label className="form-check-label">Colleges Nearby</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Apply Filters</button>
      </form>
      <PropertyList properties={properties} viewType="buyer" />
    </div>
  );
};

export default PropertyListContainer;
