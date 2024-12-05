import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';

import veiculosRoutes from './routes/veiculos.routes.js';
import pecasRoutes from './routes/pecas.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/veiculos', veiculosRoutes);
app.use('/pecas', pecasRoutes) ;
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
