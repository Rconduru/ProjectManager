import * as dotenv from "dotenv";
import dbPool from "./db";
import onReadyApi from "./config";

dotenv.config();

const API_PORT = process.env.API_PORT || "3020";
const API_HOSTNAME = process.env.API_HOSTNAME || "localhost";

const server = onReadyApi.listen(API_PORT, () => {
  console.log(`Server running at ${API_HOSTNAME}:${API_PORT}`);
});

process.on("SIGINT", () => {
  dbPool.end();
  server.close();
  console.log("Server closed!");
});
