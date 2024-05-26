const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.post('/', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    let query = {};

    // Apply filters to query
    if (filters.place) query.place = filters.place;
    if (filters.minArea) query.area = { $gte: filters.minArea };
    if (filters.maxArea) query.area = { ...query.area, $lte: filters.maxArea };
    if (filters.bedrooms) query.bedrooms = filters.bedrooms;
    if (filters.bathrooms) query.bathrooms = filters.bathrooms;
    if (filters.hospitalsNearby !== undefined) query.hospitalsNearby = filters.hospitalsNearby === 'true';
    if (filters.collegesNearby !== undefined) query.collegesNearby = filters.collegesNearby === 'true';

    const properties = await Property.find(query).populate('seller', ['firstName', 'lastName', 'email', 'phone']);
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/seller/:sellerId', async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.params.sellerId });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await Property.deleteOne(property.propertyId);
    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id/seller', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', ['firstname', 'lastname', 'email', 'phone']);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.json(property.seller);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
