import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Comércio de Veículos e Peças',
    description: 'Documentação para a API REST de comércio de veículos e peças.',
  },
  host: 'localhost:3000',
  schemes: ['http'], 
};

const outputFile = './swagger-output.json'; // Arquivo gerado
const endpointsFiles = ['./src/server.js']; // Arquivo principal com todas as rotas

swaggerAutogen()(outputFile, endpointsFiles).then(() => {
  console.log('Documentação gerada com sucesso!');
});
