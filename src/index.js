import express from "express";
import path from "path";

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
