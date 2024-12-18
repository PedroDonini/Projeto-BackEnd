const carRepository = require('../repository/carsRepository');

module.exports = {
    async getCars(req, res){
        const cars = await carRepository.getAllCarts();
        res.json(cars);
    },

    async createCar(req, res){
        if(!req.user.isAdmin) {
            return res.status(403).json({ error: 'Acessso negado '});
        }
        const { nome, marca, modelo, preco} = req.body;
        const car = { id: Date.now(), nome, marca, modelo, preco };
        await carRepository.createCar(car);
        res.status(201).json({ message: 'Carro inserido! '});
    },

    async updateCar(req, res){
        if(!req.user.isAdmin){
            return res.stauts(403).json({ error: 'Acesso Negado' });
        }
        const updatedCar = req.body;
        await carRepository.updatedCar(updatedCar);
        res.json({ message: 'Carro atualizado!' });
    },

    async deleteCar(res, res){
        if(!req.user.isAdmin){
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { id } = req.params;
        await carRepository.deleteCar(Number(id));
        res.json({ message: 'Carro deletado' });
    }
};