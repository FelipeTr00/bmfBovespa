import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = express();
app.use(express.json());

// Aqui, routes deve ser o Router que você exportou
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});