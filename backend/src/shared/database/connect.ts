import mongoose from "mongoose";
import CONFIG from "../../config";

const connect = () => {
  function init() {
    mongoose
      .connect(CONFIG.MONGO_URI)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error) => {
        console.log(error);
        process.exit(0);
      });
  }

  init();

  mongoose.set("debug", CONFIG.NODE_ENV === "development");

  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
    init();
  });

  mongoose.connection.on("error", (error) => {
    console.log(error);
    process.exit(0);
  });
};

export default connect;
