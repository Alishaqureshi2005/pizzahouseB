const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const menuData = require('./menuData');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-delivery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const importData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Import categories and products
    for (const categoryData of menuData) {
      const category = await Category.create({
        name: categoryData.category,
        description: categoryData.description
      });

      const products = categoryData.items.map(item => ({
        title: item.title,
        content: item.content,
        price: item.price,
        category: category._id
      }));

      await Product.insertMany(products);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
} else {
  console.log('Please specify -i to import data or -d to destroy data');
  process.exit(1);
} 