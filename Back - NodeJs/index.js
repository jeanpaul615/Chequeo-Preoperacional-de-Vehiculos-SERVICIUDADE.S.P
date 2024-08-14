const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//auth
const authRoutes = require('./routes/inspeccion/Auth/authRoutes');
app.use('/auth', authRoutes);

//vehicles
const vehiclesRoutes = require('./routes/inspeccion/Vehicles/vehiclesRoutes');
app.use('/vehicles', vehiclesRoutes);

//drivers
const driverRoutes = require('./routes/inspeccion/Drivers/driversRoutes');
app.use('/drivers', driverRoutes);

//inspection
const inspectionRoutes = require('./routes/inspeccion/Inspection/InspectionRoutes');
app.use('/inspection', inspectionRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});