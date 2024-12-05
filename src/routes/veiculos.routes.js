import express from 'express';
const router = express.Router();

// Exemplos de rotas
router.get('/', (req, res) => res.send('Listar veículos'));
router.post('/', (req, res) => res.send('Adicionar veículo'));

export default router;
