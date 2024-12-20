const pieceRepository = require('../repositories/pieceRepository'); // Certifique-se de que esta linha está presente

exports.createPiece = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { brand, model, price } = req.body;
  const newPiece = pieceRepository.createPiece(brand, model, price);
  res.send('Peça adicionada');
};

exports.getPieces = (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const pieces = pieceRepository.getPieces(limit, page);
  res.send(pieces);
};

exports.getAllPieces = (req, res) => { 
  const pieces = pieceRepository.getAllPieces(); 
  res.send(pieces);
};

exports.updatePiece = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { id } = req.params;
  const { brand, model, price } = req.body;
  const updatedPiece = pieceRepository.updatePiece(id, brand, model, price);
  res.send('Peça atualizada');
};

exports.deletePiece = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { id } = req.params;
  pieceRepository.deletePiece(id);
  res.send('Peça deletada');
};
