import dotenv from "dotenv";
import { createApp } from "./app";
import connectDB from "./db";

dotenv.config();

const app = createApp();

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception! Server is shutting down...");
    console.log(err.name, err.message);
    // console.log(err)
    process.exit(1);
});

const PORT = process.env.PORT || (3001 as const);

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`);
    await connectDB();
});
