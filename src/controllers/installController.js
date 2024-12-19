const userRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');

module.exports = {
  async install(req, res) {
    const existingUsers = await userRepository.getAllUsers();
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Sistema já instalado.' });
    }

    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = {
      id: Date.now(),
      username: 'admin',
      password: adminPassword,
      isAdmin: true
    };

    await userRepository.createUser(adminUser);
    res.status(201).json({ message: 'Sistema instalado com sucesso. Usuário admin criado.' });
  }
};