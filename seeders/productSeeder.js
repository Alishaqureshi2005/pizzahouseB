const Product = require('../models/Product');
const Category = require('../models/Category');

const products = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    basePrice: 12.99,
    image: '/images/products/margherita.jpg',
    category: null, // Will be set dynamically
    sizes: [
      { name: 'small', price: 10.99 },
      { name: 'medium', price: 12.99 },
      { name: 'large', price: 14.99 }
    ],
    crusts: [
      { name: 'thin', price: 0 },
      { name: 'thick', price: 1.99 },
      { name: 'stuffed', price: 2.99 }
    ],
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 15,
    calories: 266,
    customization: {
      allowExtraToppings: true,
      allowExtraCheese: true,
      allowExtraSauce: true,
      allowCrustSelection: true,
      allowSizeSelection: true,
      maxToppings: 5,
      maxExtraCheese: 2,
      maxExtraSauce: 2
    }
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and pepperoni',
    basePrice: 14.99,
    image: '/images/products/pepperoni.jpg',
    category: null, // Will be set dynamically
    sizes: [
      { name: 'small', price: 12.99 },
      { name: 'medium', price: 14.99 },
      { name: 'large', price: 16.99 }
    ],
    crusts: [
      { name: 'thin', price: 0 },
      { name: 'thick', price: 1.99 },
      { name: 'stuffed', price: 2.99 }
    ],
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    preparationTime: 15,
    calories: 298,
    customization: {
      allowExtraToppings: true,
      allowExtraCheese: true,
      allowExtraSauce: true,
      allowCrustSelection: true,
      allowSizeSelection: true,
      maxToppings: 5,
      maxExtraCheese: 2,
      maxExtraSauce: 2
    }
  },
  {
    name: 'Vegetarian Pizza',
    description: 'Pizza loaded with fresh vegetables',
    basePrice: 13.99,
    image: '/images/products/vegetarian.jpg',
    category: null, // Will be set dynamically
    sizes: [
      { name: 'small', price: 11.99 },
      { name: 'medium', price: 13.99 },
      { name: 'large', price: 15.99 }
    ],
    crusts: [
      { name: 'thin', price: 0 },
      { name: 'thick', price: 1.99 },
      { name: 'stuffed', price: 2.99 }
    ],
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 15,
    calories: 245,
    customization: {
      allowExtraToppings: true,
      allowExtraCheese: true,
      allowExtraSauce: true,
      allowCrustSelection: true,
      allowSizeSelection: true,
      maxToppings: 5,
      maxExtraCheese: 2,
      maxExtraSauce: 2
    }
  }
];

const importData = async () => {
  try {
    await Product.deleteMany({});

    // Get the Classic Pizzas category
    const category = await Category.findOne({ name: 'Classic Pizzas' });
    if (!category) {
      throw new Error('Classic Pizzas category not found. Please seed categories first.');
    }

    // Set category for all products
    const productsWithCategory = products.map(product => ({
      ...product,
      category: category._id
    }));

    await Product.insertMany(productsWithCategory);
    console.log('Products Imported!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany({});
    console.log('Products Destroyed!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  importData,
  destroyData
}; 