module.exports = {
    getDocs(req, res) {
      const swaggerDocument = require('../docs/swagger.json');
      res.status(200).json(swaggerDocument);
    }
  };