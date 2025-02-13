const axios = require("axios");
require("dotenv").config()

const ECOM_API_URL = process.env.ECOM_API_URL 

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await axios.get(ECOM_API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

// Fetch product details by ID
const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${ECOM_API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product details: " + error.message);
  }
};

module.exports = {
  fetchProducts,
  fetchProductDetails,
};
