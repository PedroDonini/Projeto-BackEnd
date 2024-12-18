const jwt = require('jsonwebtoken');

module.exports = {
  authenticate(req, res, next){
    const token = req.headers[ 'authorization' ];
    if(!token){
      return res.status(401).json({ error: 'Token ausente' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err){
        return res.status(403).json({ err: 'Token invalido' });
      }
      req.user = user;
      next();
    });
  },

  authorizeAdmin(req, res, next){
    if(!req.user.isAdmin){
      return res.status(403).json({ message: 'Acesso Negado' });
    }
    next();
  }
};
