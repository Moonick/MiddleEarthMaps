import fs from "node:fs";
import express from "express";
import cors from "cors";
import path from "node:path";
import dotenv from "dotenv";

const envPath = "../.env";

if (!fs.existsSync(envPath)) {
  console.error(".env not found!");
  process.exit(1);
}

dotenv.config({ path: envPath });

const app = express();
const SERVER_IP = process.env.EXPO_PUBLIC_BACKEND_URL;
const PORT = process.env.EXPO_PUBLIC_BACKEND_PORT;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/pins", (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "./data/react-native-interview-task-pins.json");
    const pinsData = fs.readFileSync(filePath, "utf8");
    const pinsArray = JSON.parse(pinsData);
    const normalizedData = {
      pins: {},
      allIds: [],
    };

    pinsArray.forEach((pin) => {
      normalizedData.pins[pin._id] = pin;
      normalizedData.allIds.push(pin._id);
    });

    res.json(normalizedData);
  } catch (error) {
    console.error("Error reading pins file:", error);
    res.status(500).json({ message: "Internal Server Error" + error });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://${SERVER_IP}:${PORT}`);
});
