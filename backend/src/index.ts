import * as dotenv from "dotenv";
import dbPool from "./db";
import onReadyApi from "./config";

dotenv.config();

const PORT = process.env.PORT || "3020";
const HOSTNAME = process.env.HOSTNAME || "localhost";

const server = onReadyApi.listen(PORT, () => {
  console.log(`Server running at ${HOSTNAME}`);
});

process.on("SIGINT", () => {
  dbPool.end();
  server.close();
  console.log("Server closed!");
});
