const userRepository = require('../repository/userRepository');

module.exports = {
  async getAdmins(req, res) {
    const users = await userRepository.getAllUsers();
    const admins = users.filter(user => user.isAdmin);
    res.json(admins);
  },

  async createAdmin(req, res) {
    const { username, password } = req.body;
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = { id: Date.now(), username, password: hashedPassword, isAdmin: true };
    await userRepository.createUser(admin);
    res.status(201).json({ message: 'Administrador criado com sucesso' });
  },

  async deleteAdmin(req, res) {
    const { id } = req.params;
    const admin = await userRepository.findUserById(Number(id));
    if (!admin || !admin.isAdmin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
    }

    await userRepository.deleteUser(Number(id));
    res.json({ message: 'Administrador excluído com sucesso' });
  }
};
