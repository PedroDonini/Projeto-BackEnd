const fs = require('fs/promises');

module.exports = {
    async readJsonFile(filePath) {
      try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') return []; // Retorna array vazio se o arquivo não existir
        throw error;
      }
    },
  
    async writeJsonFile(filePath, content) {
      await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    }
  };