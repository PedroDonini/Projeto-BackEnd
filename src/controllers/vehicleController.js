const vehicleRepository = require('../repositories/vehicleRepository'); // Importação correta

exports.createVehicle = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { brand, model, price } = req.body;
  const newVehicle = vehicleRepository.createVehicle(brand, model, price);
  res.send('Veiculo adicionado');
};

exports.getVehicles = (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const vehicles = vehicleRepository.getVehicles(limit, page);
  res.send(vehicles);
};

exports.updateVehicle = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { id } = req.params;
  const { brand, model, price } = req.body;
  const updatedVehicle = vehicleRepository.updateVehicle(id, brand, model, price);
  res.send('Veiculo atualizado');
};

exports.deleteVehicle = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { id } = req.params;
  vehicleRepository.deleteVehicle(id);
  res.send('Veiculo Deletado');
};
