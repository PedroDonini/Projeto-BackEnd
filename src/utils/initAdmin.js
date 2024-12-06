import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.resolve('./data/usuarios.json');

// Inicializa o sistema com um administrador padrão
function initAdmin() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); // Cria um admin se já não existir um
  }

  const usuarios = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  const hasAdmin = usuarios.some(user => user.role === 'admin');
  
  if (!hasAdmin) {
    const defaultAdmin = {
      id: uuidv4(),
      nome: 'Admin',
      email: 'admin@admin.com',
      senha: 'admin',
      role: 'admin',
    };
    usuarios.push(defaultAdmin);
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
    console.log('Admin padrão criado');
  }
}

export default initAdmin;
