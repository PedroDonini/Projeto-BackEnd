// Middleware para verificar privilégio do usuário
const verificaAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado: privilégios de administrador necessários.' });
    }
    next();
  };

export default verificaAdmin ;  
 
  