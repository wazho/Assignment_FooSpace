// Node modules.
import { includes, pickBy, isEqual, sortBy, uniq } from "lodash";
// Local modules.
import database from "../../data/database.json";
import { logger } from "./logger";

// Create logger.
const mylogger = logger("productInfo");

/**
 * Get all products data from database.
 * @returns {Object} Key is productID. Value contains productID, name and price.
 */
const getAllProducts = () => {
  mylogger("Start to access all products");

  try {
    const { products } = database;

    // Extend element about productID.
    for (const [productID, product] of Object.entries(products)) {
      product.productID = productID;
    }

    mylogger("All products %j", products);

    return products;
  } catch (e) {
    mylogger("Error Message %j", e.message);
    mylogger("Error Stack %j", e.stack);
  }
};

/**
 * Get partial products data from database with IDs.
 * @param {Array} productIDs A string array.
 * @returns {Object} Key is productID. Value contains productID, name and price.
 */
const getProductsByIDs = (productIDs = []) => {
  mylogger("Start to access partial products by IDs %j", productIDs);

  // All productIDs = ['001', '002', '003', '004', '005'].
  const allProducts = getAllProducts();
  // Filtered productIDs = ['002', '003', '004'].
  const products = pickBy(allProducts, (val, key) => includes(productIDs, key));

  const setFromParams = uniq(sortBy(productIDs));
  const setFromQuery = sortBy(Object.keys(products));

  if (!isEqual(setFromParams, setFromQuery)) {
    throw new Error(`Cannot find the product by IDs: ${productIDs}`);
  }

  mylogger("Partial products %j", products);

  return products;
};

export { getAllProducts, getProductsByIDs };
