const partRepository = require('../repository/partRepository');

module.expors = {
    async getParts(req, res) {
        const parts = await partRepository.getAllParts();
        res.json(parts);
    },

    async createPart(req, res){
        if(!req.user.isAdmin){
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { nome, modelo, preco } = req.body;
        const part = { id: Date.now(), nome, modelo, preco };
        await partRepository.createPart(part)
        res.status(201).json({ message: 'Peça inserida' });
    },

    async updatePart(req, res){
        if(!req.user.isAdmin){
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const updatedPart = req.body;
        await partRepository.updatePart(updatedPart)
        res.json({ message: 'Peça atualizada' });
    },

    async deletePart(req, res){
        if(!req.user.isAdmin){
            return res.status(403).json({ error: 'Acesso negado' });
        }
        const { id } = req.params;
        await partRepository.deletePart(Number(id));
        res.json({ message: 'Peça deletada' });
    }
};
