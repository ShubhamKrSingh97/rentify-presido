import React, { useState } from 'react';
import axios from 'axios';
import { getUserId } from '../session';

const PropertyForm = ({ onPropertyPosted }) => {
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospitalsNearby: false,
    collegesNearby: false,
  });
  const [error, setError] = useState(null);


  const { place, area, bedrooms, bathrooms, hospitalsNearby, collegesNearby } = formData;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/properties', {...formData, seller: getUserId()});
      onPropertyPosted(response.data);
      setFormData({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        hospitalsNearby: false,
        collegesNearby: false,
      });
      setError(null); // Clear error on successful post
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Post a Property</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Place</label>
          <input
            type="text"
            name="place"
            value={place}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Area (sqft)</label>
          <input
            type="number"
            name="area"
            value={area}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={bedrooms}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={bathrooms}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="hospitalsNearby"
            checked={hospitalsNearby}
            onChange={onChange}
            className="form-check-input"
          />
          <label className="form-check-label">Hospitals Nearby</label>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="collegesNearby"
            checked={collegesNearby}
            onChange={onChange}
            className="form-check-input"
          />
          <label className="form-check-label">Colleges Nearby</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Post Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
