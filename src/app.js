require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bcrypt = require('bcryptjs');
const userRepository = require('./repositories/userRepository');
const errorHandler = require('./middlewares/errorHandler');
const authenticate = require('./middlewares/authenticate');

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Variáveis de ambiente
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// Rotas
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const pieceRoutes = require('./routes/pieceRoutes');

app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/pieces', pieceRoutes);

// Rota de instalação
app.get('/install', (req, res) => {
  const admin = {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', 10),
    role: 'admin',
  };
  
  userRepository.createUser(admin.username, admin.password, admin.role);
  res.send('Admin criado');
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
