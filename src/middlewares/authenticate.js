const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acesso negado');
  
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};