const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middlewares/authenticate');
const validateData = require('../middlewares/validateData');
const { vehicleSchema } = require('../models/schemas');

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Criar um novo veículo
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Veículo criado com sucesso
 *       403:
 *         description: Acesso negado
 */
router.post('/', authenticate, validateData(vehicleSchema), vehicleController.createVehicle);


/**
 * @swagger
 * /vehicles/all:
 *   get:
 *     summary: Listar todos os veículos
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   brand:
 *                     type: string
 *                   model:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/all', authenticate, vehicleController.getAllVehicles);


/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Listar veículos com paginação
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           enum: [5, 10, 30]
 *         description: Número de objetos a serem retornados
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página a ser retornada
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   brand:
 *                     type: string
 *                   model:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/', authenticate, vehicleController.getVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Atualizar um veículo
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Veículo não encontrado
 */
router.put('/:id', authenticate, validateData(vehicleSchema), vehicleController.updateVehicle);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Excluir um veículo
 *     tags: [Veículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo excluído com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Veículo não encontrado
 */
router.delete('/:id', authenticate, vehicleController.deleteVehicle);

module.exports = router;
