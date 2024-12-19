const fileUtils = require('../utils/fileUtils');
const User = require('../models/userModel');
const filePath = './data/users.json';

module.exports = {
  async getAllUsers() {
    const data = await fileUtils.readJsonFile(filePath);
    return data.map(user => new User(user.id, user.username, user.password, user.isAdmin));
  },

  async saveUsers(users) {
    await fileUtils.writeJsonFile(filePath, users);
  },

  async findUserByUsername(username) {
    const users = await this.getAllUsers();
    return users.find(user => user.username === username);
  },

  async findUserById(userId) {
    const users = await this.getAllUsers();
    return users.find(user => user.id === userId);
  },

  async createUser(user) {
    const users = await this.getAllUsers();
    users.push(user);
    await this.saveUsers(users);
  },

  async updateUser(updatedUser) {
    const users = await this.getAllUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      await this.saveUsers(users);
    }
  },

  async deleteUser(userId) {
    let users = await this.getAllUsers();
    users = users.filter(user => user.id !== userId);
    await this.saveUsers(users);
  }
};
