const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Voyage = require('./models/Voyage');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Routes
app.get('/api/voyages', async (req, res) => {
  const voyages = await Voyage.find();
  res.json(voyages);
});

app.post('/api/voyages', async (req, res) => {
  try {
    const newVoyage = new Voyage(req.body);
    await newVoyage.save();
    res.status(201).json(newVoyage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// EDIT/UPDATE ROUTE (add this)
app.put('/api/voyages/:id', async (req, res) => {
  try {
    const updatedVoyage = await Voyage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVoyage) {
      return res.status(404).json({ message: 'Voyage not found' });
    }
    res.json(updatedVoyage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});
