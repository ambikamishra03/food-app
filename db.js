const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully!");

    const fetchedData = await mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();

    const food_category = await mongoose.connection.db.collection("food_category");
    const catData = await food_category.find({}).toArray();

    // Assign the fetched data to the global variables
    global.food_items = data;
    global.food_category = catData;
    // console.log(food_items);

  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
