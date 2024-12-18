const files = require('../utils/files');
const filePath = './data/carPart.json';

module.exports = {
    async getAllParts(){
        return await files.readJson(filePath);
    },

    async saveParts(parts){
        await files.readJsonFile(filePath);
    },

    async createPart(part){
        const parts = await this.getAllParts();
        parts.push(part);
        await this.saveParts(parts);
    },

    async updatePart(updatedPart){
        const parts = await this.getAllParts();
        const index = parts.findIndex(part => part.id === this.updatePart.id);
        if(index !== -1){
            parts[index] = updatedPart;
            await this.saveParts(parts);
        }
    },

    async deletePart(partId){
        let parts = await this.getAllParts();
        parts = parts.filter(part => part.id !== partId);
        await this.saveParts(parts);
    }
};