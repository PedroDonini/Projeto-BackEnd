const fileUtils = require('../utils/fileUtils');
const Car = require('../models/carModel');
const filePath = './data/cars.json';

module.exports = {
  async getAllCars() {
    const data = await fileUtils.readJsonFile(filePath);
    return data.map(car => new Car(car.id, car.nome, car.marca, car.modelo, car.preco));
  },

  async saveCars(cars) {
    await fileUtils.writeJsonFile(filePath, cars);
  },

  async createCar(car) {
    const cars = await this.getAllCars();
    cars.push(car);
    await this.saveCars(cars);
  },

  async updateCar(updatedCar) {
    const cars = await this.getAllCars();
    const index = cars.findIndex(car => car.id === updatedCar.id);
    if (index !== -1) {
      cars[index] = updatedCar;
      await this.saveCars(cars);
    }
  },

  async deleteCar(carId) {
    let cars = await this.getAllCars();
    cars = cars.filter(car => car.id !== carId);
    await this.saveCars(cars);
  }
};
