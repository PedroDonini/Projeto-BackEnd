import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secreto';

// Middleware para verificar o token JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ erro: 'Token não fornecido.' });
  }

  // Verifica se o token é válido
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }

    // Armazena as informações do usuário decodificadas no request
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
