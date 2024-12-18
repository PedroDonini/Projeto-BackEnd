const fs = require('fs/promises');

module.exports = {

    // ler arquivo 
    async readJson(filePath){
        try{
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }catch (error){
            // caso não exista 
            if(error.code === 'ENOENT'){
                return [];
            }
            throw error;
        }
    },
    
    // escreve e converte para JSON
    async writeJsonFile(filePath, content){
        await fs.writeFile(filePath, JSON.stringify(content, null, 2))
    }
}