import express from 'express';
import fs from 'fs';
import authMiddleware from '../middlewares/authMiddleware.js'; 
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Rota de cadastro de veículos 
router.post('/veiculos', authMiddleware, (req, res) => {
  const { marca, modelo, ano } = req.body;

  // Validação básica dos dados recebidos
  if (!marca || !modelo || !ano) {
    return res.status(400).json({ erro: 'Marca, modelo e ano são obrigatórios.' });
  }

  // Lê os veículos do arquivo JSON
  const veiculos = JSON.parse(fs.readFileSync('./data/veiculos.json', 'utf8'));

  // Cria um novo veículo com um ID único
  const novoVeiculo = {
    id: uuidv4(), // 
    marca,
    modelo,
    ano,
    usuarioId: req.user.id // 
  };

  // Adiciona o novo veículo
  veiculos.push(novoVeiculo);

  // Salva o novo veículo
  fs.writeFileSync('./data/veiculos.json', JSON.stringify(veiculos, null, 2));

  // Retorna a resposta de sucesso
  res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso.', veiculo: novoVeiculo });
});

export default router;
