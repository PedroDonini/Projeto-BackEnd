import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const USERS_FILE = './data/usuarios.json'; 

// Função para carregar os dados do arquivo
function carregarUsuarios() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data) || [];
}

// Função para salvar os dados no arquivo
function salvarUsuarios(usuarios) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
}

// Rota para cadastrar um novo usuário
router.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios.' });
  }

  const usuarios = carregarUsuarios();

  // Verifica se o e-mail já foi usado
  const emailExistente = usuarios.find((user) => user.email === email);
  if (emailExistente) {
    return res.status(409).json({ erro: 'E-mail já cadastrado.' });
  }

  // Cria um novo usuário
  const novoUsuario = {
    id: uuidv4(), // Gerando ID único
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', usuario: novoUsuario });
});

// Rota para listar todos os usuários
router.get('/usuarios', (req, res) => {
  const usuarios = carregarUsuarios();
  res.json(usuarios);
});

export default router;
