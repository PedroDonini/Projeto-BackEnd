const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    async registerUser(req, res) {
      const { username, password, isAdmin } = req.body;
      const existingUser = await userRepository.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: Date.now(), username, password: hashedPassword, isAdmin: !!isAdmin };
      await userRepository.createUser(user);
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    },
  
    async login(req, res) {
      const { username, password } = req.body;
      const user = await userRepository.findUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword){
        return res.status(401).json({ error: 'Senha incorreta' });
      }
  
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    },
  
    async getUsers(req, res) {
      const users = await userRepository.getAllUsers();
      res.json(users);
    }
  }