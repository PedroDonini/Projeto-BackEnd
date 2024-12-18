const files = require('../utils/files');
const filePath = './data/users.json';

module.exports = {
    async getAll() {
        return await files.readJsonFile(filePath);
    },

    async saveUsers(users){
        await fileUtils.writeJsonFile(filePath, users);
    },

    async findUserByUserName(username){
        const users = await this.getAllUsers();
        return users.find(user => user.name === username);
    },

    async createUser(user){
        const users = await this.getAllUsers();
        users.push(user);
        await this.saveUsers(users);
    },

    async updateUser(uptadeUser){
        const users = await this.getAllUsers();
        const index = users.findIndex(user => user.id === this.updateUser.id);
        if(index !== -1){
            users[index] = updatedUser;
            await this.saveUsers(users);
        }
    },

    async deleteUser(userId){
        let users = await this.getAllUsers();
        users = users.filter(user => user.id !== userId);
        await this.saveUsers(users);
    }
};

