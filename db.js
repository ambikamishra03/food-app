// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();
// const MONGO_URL = process.env.MONGO_URL;

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected successfully!");

//     const fetchedData = await mongoose.connection.db.collection("food_items");
//     const data = await fetchedData.find({}).toArray();

//     const food_category = await mongoose.connection.db.collection("food_category");
//     const catData = await food_category.find({}).toArray();

//     // Assign the fetched data to the global variables
//     global.food_items = data;
//     global.food_category = catData;
//     // console.log(food_items);
//     // console.log(food_category);

//   } catch (error) {
//     console.error("Error while connecting to MongoDB:", error);
//   }
// };

// module.exports = mongoDB;



const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const mongoDB = async () => {
  try {
    // Connect to MongoDB using the provided URL and options
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB!");

    // Fetch the food_items collection
    const foodItemsCollection = await mongoose.connection.db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    // Fetch the food_category collection
    const foodCategoryCollection = await mongoose.connection.db.collection("food_category");
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    // Log the fetched data
    // console.log("Food Items:", foodItems);
    // console.log("Food Category:", foodCategory);

    // Assign the fetched data to the global variables
    global.food_items = foodItems;
    global.food_category = foodCategory;

  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;

