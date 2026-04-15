const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vishnumee8_db_user:vishnu877@cluster0.oxwhqgu.mongodb.net/?appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => {
  console.log("❌ MongoDB ERROR:");
  console.log(err.message);
});