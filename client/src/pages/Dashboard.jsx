import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyForm from '../components/PropertyForm';
import PropertyListSeller from '../components/PropertyListSeller';
import { getUserId, getRole, clearSession } from '../session';
import PropertyListBuyer from '../components/PropertyListBuyer';
import Logo from '../components/Logo';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const role = getRole();

  const handlePropertiesUpdate = (updatedProperties) => {
    setProperties(updatedProperties);
  };


  const fetchPropertiesBySellerId = async () => {
    try {
      const response = await axios.get(`/api/properties/seller/${getUserId()}`); // Replace YOUR_SELLER_ID with the actual seller ID
      setProperties(response.data);
      setError(null); // Clear error on successful fetch
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const fetchAllProperties = async () => {
    try {
      const response = await axios.get(`/api/properties/`); // Replace YOUR_SELLER_ID with the actual seller ID
      console.log(response.data)
      setProperties(response.data);
      setError(null); // Clear error on successful fetch
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  }

  useEffect(() => {
    if(role === 'seller'){
      fetchPropertiesBySellerId()
    }
    else {
      fetchAllProperties()
    }
  }, [role]);

  const handlePropertyPosted = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  const handleDelete = (propertyId) => {
    setProperties(properties.filter(property => property._id !== propertyId));
  };

  const logout = () => {
    clearSession();
    window.location.reload()
  }

  return (
    <div className="container mt-5">
     <div className="row justify-content-between align-items-center mb-5">
        <div className="col">
          <Logo/>
          <h1 className="text-capitalize">{role} Dashboard</h1>
        </div>
        <div className="col-auto">
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {role === 'seller' &&  <PropertyForm onPropertyPosted={handlePropertyPosted} />}
      {role === 'seller' ? <PropertyListSeller properties={properties} onDelete={handleDelete} /> : <PropertyListBuyer properties={properties} onPropertiesUpdate={handlePropertiesUpdate}/>}
    </div>
  );
};

export default Dashboard;
