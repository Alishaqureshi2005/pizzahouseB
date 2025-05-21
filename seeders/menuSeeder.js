const Product = require('../models/Product');
const Category = require('../models/Category');
const menuData = require('./menuData');

const importData = async () => {
  try {
    // Get all categories first
    const categories = await Category.find({});
    if (!categories.length) {
      console.log('No categories found. Please run category seeder first.');
      return;
    }

    // Create a map of category names to their IDs
    const categoryMap = categories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Process each menu category
    for (const menuCategory of menuData) {
      const categoryId = categoryMap[menuCategory.category];
      if (!categoryId) {
        console.log(`Category not found: ${menuCategory.category}`);
        continue;
      }

      // Process each item in the category
      for (const item of menuCategory.items) {
        const basePrice = parseFloat(item.price);
        // Calculate size prices ensuring no negative values
        const smallPrice = Math.max(basePrice - 1, 0.5); // Minimum 0.5 for small
        const mediumPrice = basePrice;
        const largePrice = basePrice + 1;

        const product = {
          name: item.title,
          description: item.content,
          image: '/images/default-product.jpg', // Default image path
          category: categoryId,
          basePrice: basePrice,
          countInStock: 100,
          isVegetarian: item.isVegetarian || false,
          isSpicy: item.isSpicy || false,
          isPopular: false,
          isActive: true,
          calories: 500, // Default calories value
          ingredients: item.content.split(', '),
          customization: {
            sizes: [
              { name: 'small', price: smallPrice },
              { name: 'medium', price: mediumPrice },
              { name: 'large', price: largePrice }
            ],
            crusts: [
              { name: 'classic', price: 0 },
              { name: 'thin', price: 0 },
              { name: 'thick', price: 1 },
              { name: 'stuffed', price: 2 }
            ],
            maxToppings: 5,
            maxExtraItems: 3
          }
        };

        try {
          await Product.create(product);
          console.log(`Created product: ${product.name}`);
        } catch (error) {
          console.error(`Error creating product ${product.name}:`, error.message);
        }
      }
    }

    console.log('Menu items imported successfully!');
  } catch (error) {
    console.error('Error importing menu items:', error);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany({});
    console.log('Menu Items Destroyed!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  importData,
  destroyData
}; 