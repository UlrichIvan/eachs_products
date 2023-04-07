const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
module.exports = async function connection() {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONG0_URL, {
      // user: process.env.DBUSERNAME,
      // pass: process.env.DBPWD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base cree avec succes");
    //Create a first super user automatically

    db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
      console.log("mongodb connected successfully!!!");
    });
  } catch (error) {
    console.log(error);
    console.log("Could not connect to database!");
  }
};
