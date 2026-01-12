import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Express JS
const app = express();
const port = 3000;

// Client Prisma
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Test route
app.get('/', async (req, res) => {
  const users = await prisma.utilisateur.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
