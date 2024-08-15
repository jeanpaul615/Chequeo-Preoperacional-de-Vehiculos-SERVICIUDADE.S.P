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
const authRoutes = require('./INSPECTION/Auth/authRoutes');
app.use('/auth', authRoutes);

//vehicles
const vehiclesRoutes = require('./INSPECTION/Vehicles/vehiclesRoutes');
app.use('/vehicles', vehiclesRoutes);

//drivers
const driverRoutes = require('./INSPECTION/Drivers/driversRoutes');
app.use('/drivers', driverRoutes);

//inspection
const inspectionRoutes = require('./INSPECTION/Inspection/InspectionRoutes');
app.use('/inspection', inspectionRoutes);

//users
const usersRoutes = require('./INSPECTION/Users/userRoutes');
app.use('/users', usersRoutes);


//indicator
const indicatorRoutes = require('./INDICATORS/Indicators/indicatorsRoutes');
app.use('/indicators', indicatorRoutes);


//variables
const variablesRoutes = require('./INDICATORS/Variables/variablesRoutes');
app.use('/variables', variablesRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});