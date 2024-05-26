const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const cors = require('cors');
const Property = require('./models/Property');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

app.post('/api/properties/like/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    property.likes += 1;
    await property.save();
    io.emit('propertyLiked', { id: property._id, likes: property.likes });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
