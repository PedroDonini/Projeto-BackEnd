const fs = require('fs');
const Vehicle = require('../models/vehicleModel');
const vehicles = JSON.parse(fs.readFileSync('./data/vehicles.json'));

exports.createVehicle = (brand, model, price) => {
  const newVehicle = new Vehicle(vehicles.length + 1, brand, model, price);
  vehicles.push(newVehicle);
  fs.writeFileSync('./data/vehicles.json', JSON.stringify(vehicles, null, 2));
  return newVehicle;
};

exports.getVehicles = (limit, page) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return vehicles.slice(startIndex, endIndex);
};

exports.updateVehicle = (id, brand, model, price) => {
  const vehicle = vehicles.find(v => v.id == id);
  vehicle.brand = brand;
  vehicle.model = model;
  vehicle.price = price;
  fs.writeFileSync('./data/vehicles.json', JSON.stringify(vehicles, null, 2));
  return vehicle;
};

exports.deleteVehicle = (id) => {
  const index = vehicles.findIndex(v => v.id == id);
  if (index > -1) {
    vehicles.splice(index, 1);
    fs.writeFileSync('./data/vehicles.json', JSON.stringify(vehicles, null, 2));
  }
};
