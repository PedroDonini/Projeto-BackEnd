const fileUtils = require('../utils/fileUtils');
const Part = require('../models/partModel');
const filePath = './data/parts.json';

module.exports = {
  async getAllParts() {
    const data = await fileUtils.readJsonFile(filePath);
    return data.map(part => new Part(part.id, part.nome, part.modelo, part.preco));
  },

  async saveParts(parts) {
    await fileUtils.writeJsonFile(filePath, parts);
  },

  async createPart(part) {
    const parts = await this.getAllParts();
    parts.push(part);
    await this.saveParts(parts);
  },

  async updatePart(updatedPart) {
    const parts = await this.getAllParts();
    const index = parts.findIndex(part => part.id === updatedPart.id);
    if (index !== -1) {
      parts[index] = updatedPart;
      await this.saveParts(parts);
    }
  },

  async deletePart(partId) {
    let parts = await this.getAllParts();
    parts = parts.filter(part => part.id !== partId);
    await this.saveParts(parts);
  }
};