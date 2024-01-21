import fs from 'node:fs/promises';
import express from 'express';
import cors from "cors";
import path from 'node:path';

const app = express();
const SERVER_IP = '192.168.1.186';
const PORT = 3000;


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get(`/api/pins`, async(req, res) => {
  try {
    const filePath = path.join(process.cwd(), './data/react-native-interview-task-pins.json');
    const pins = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(pins));
  } catch (error) {
    console.error('Error reading pins file:', error);
    res.status(500).json({ message: 'Internal Server Error' + error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://${SERVER_IP}:${PORT}`);
});
