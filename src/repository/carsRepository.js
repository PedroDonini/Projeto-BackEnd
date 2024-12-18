const files = require('../utils/files');
const { getAll } = require('./userRepository');
const filePath = './data/cars.json';

module.exports = {
    async getAll(){
        return await files.readJsonFile(filePath);
    },

    async saveCars(cars){
        await files.writeJsonFile(filePath, cars);
    },

    async createCar(car){
        const cars = await this.getAllCars();
        cars.push(car);
        await this.saveCars(cars);
    },

    async updateCar(updatedCar){
        const cars = await this.getAllCars();
        const index = cars.findIndex(car => car.id === updatedCar.id);
        if(index !== 1){
            cars[index] = updatedCar;
            await this.saveCars(cars);
        }
    },

    async deleteCar(carId){
        let cars = await this.getAllCars();
        cars = cars.filter(car => car.id !== carId);
        await this.saveCars(cars);
    }
};