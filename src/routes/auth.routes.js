import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const router = express.Router();
const SECRET_KEY = 'secreto';

// Rota de login (autenticação)
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Lê os usuários do arquivo
  const users = JSON.parse(fs.readFileSync('./data/usuarios.json', 'utf8'));

  // Encontra o usuário com o email informado
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ erro: 'Usuário não encontrado.' });
  }

  // Verifica se a senha está correta 
  if (user.senha !== senha) {
    return res.status(400).json({ erro: 'Senha incorreta.' });
  }

  // Gera um token JWT com o id do usuário e um tempo de expiração
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // Retorna o token gerado
  res.status(200).json({ token });
});

export default router;
