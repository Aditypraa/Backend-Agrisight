import express from "express";
import dotenv from "dotenv";
import db from "./configs/database.config.js";

// ROUTES
import artikelRoute from "./routes/Artikel.routes.js";

//EXPRESS
const app = express();

// DOTENV
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sync({ force: false })
  .then(() => {
    console.info("database synced");
  })
  .catch((err) => {
    console.error("failed to sync database: " + err.message);
  });

app.use("/api/artikel", artikelRoute);

app.listen(PORT, () => {
  console.log(`💡 listening on http://localhost:${PORT}`);
});