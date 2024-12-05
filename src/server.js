import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
