const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

exports.register = (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = userRepository.createUser(username, hashedPassword, role);
  res.send('Usuario registrado');
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = userRepository.findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(400).send('Invalid credentials');
  
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
  res.send({ token });
};

exports.createAdmin = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newAdmin = userRepository.createUser(username, hashedPassword, 'admin');
  res.send('Admin criado');
};

exports.deleteUser = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  
  const { id } = req.params;
  const user = userRepository.findUserById(id);
  if (user && user.role !== 'admin') {
    userRepository.deleteUser(id);
    res.send('Usuario deletado');
  } else {
    res.status(404).send('Usuário não encontrado ou não é possível excluir o administrador');
  }
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
  
  if (req.user.role === 'admin' || req.user.id === parseInt(id)) {
    const updatedUser = userRepository.updateUser(id, username, hashedPassword);
    res.send('Usuario atualizado');
  } else {
    res.status(403).send('Accesso negado');
  }
};

exports.getUsers = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Acesso negado');
  
  const { limit = 10, page = 1 } = req.query;
  const users = userRepository.getUsers(limit, page);
  res.send(users);
};

