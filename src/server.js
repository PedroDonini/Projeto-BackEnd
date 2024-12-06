import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger-output.json' assert { type: 'json' } ;

import veiculosRoutes from './routes/veiculos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js' ;

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(bodyParser.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/veiculos', veiculosRoutes);
app.use(usuariosRoutes);
app.use(authRoutes) ;


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
