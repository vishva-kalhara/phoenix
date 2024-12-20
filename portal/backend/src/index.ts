import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || (3001 as const);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
