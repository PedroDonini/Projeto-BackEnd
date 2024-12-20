const fs = require('fs');
const Piece = require('../models/pieceModel');
const pieces = JSON.parse(fs.readFileSync('./data/pieces.json'));

exports.createPiece = (brand, model, price) => {
  const newPiece = new Piece(pieces.length + 1, brand, model, price);
  pieces.push(newPiece);
  fs.writeFileSync('./data/pieces.json', JSON.stringify(pieces, null, 2));
  return newPiece;
};

exports.getPieces = (limit, page) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return pieces.slice(startIndex, endIndex);
};

exports.getAllPieces = () => {
  return pieces;
};

exports.updatePiece = (id, brand, model, price) => {
  const piece = pieces.find(p => p.id == id);
  piece.brand = brand;
  piece.model = model;
  piece.price = price;
  fs.writeFileSync('./data/pieces.json', JSON.stringify(pieces, null, 2));
  return piece;
};

exports.deletePiece = (id) => {
  const index = pieces.findIndex(p => p.id == id);
  if (index > -1) {
    pieces.splice(index, 1);
    fs.writeFileSync('./data/pieces.json', JSON.stringify(pieces, null, 2));
  }
};
