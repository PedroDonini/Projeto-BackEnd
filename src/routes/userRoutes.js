const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const validateData = require("../middlewares/validateData");
const { userSchema } = require("../models/schemas");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/register", validateData(userSchema), userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /users/create-admin:
 *   post:
 *     summary: Criar um novo administrador
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador criado com sucesso
 *       403:
 *         description: Acesso negado
 */
router.post("/create-admin", authenticate, userController.createAdmin);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir um usuário
 *     tags: [Usuários]
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
 *         description: Usuário excluído com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", authenticate, userController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar dados de um usuário
 *     tags: [Usuários]
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
  "/:id",
  authenticate,
  validateData(userSchema),
  userController.updateUser
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos os usuários com paginação
 *     tags: [Usuários]
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
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get('/', authenticate, userController.getUsers);

module.exports = router;

