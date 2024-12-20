const express = require('express');
const router = express.Router();
const pieceController = require('../controllers/pieceController');
const authenticate = require('../middlewares/authenticate');
const validateData = require('../middlewares/validateData');
const { pieceSchema } = require('../models/schemas');

/**
 * @swagger
 * /pieces:
 *   post:
 *     summary: Criar uma nova peça
 *     tags: [Peças]
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
 *         description: Peça criada com sucesso
 *       403:
 *         description: Acesso negado
 */
router.post('/', authenticate, validateData(pieceSchema), pieceController.createPiece);

/**
 * @swagger
 * /pieces/all:
 *   get:
 *     summary: Listar todas as peças
 *     tags: [Peças]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as peças
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
router.get('/all', authenticate, pieceController.getAllPieces);

/**
 * @swagger
 * /pieces:
 *   get:
 *     summary: Listar peças com paginação
 *     tags: [Peças]
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
 *         description: Lista de peças
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
router.get('/', authenticate, pieceController.getPieces);

/**
 * @swagger
 * /pieces/{id}:
 *   put:
 *     summary: Atualizar uma peça
 *     tags: [Peças]
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
 *         description: Peça atualizada com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Peça não encontrada
 */
router.put('/:id', authenticate, validateData(pieceSchema), pieceController.updatePiece);

/**
 * @swagger
 * /pieces/{id}:
 *   delete:
 *     summary: Excluir uma peça
 *     tags: [Peças]
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
 *         description: Peça excluída com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Peça não encontrada
 */
router.delete('/:id', authenticate, pieceController.deletePiece);

module.exports = router;
