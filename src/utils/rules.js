// Node modules.
import { clone, groupBy, filter, sumBy } from "lodash";
// Local modules.
import { logger } from "./logger";

// Create logger.
const mylogger = logger("rules");

/**
 * Rule: [優惠活動 1] 同商品第 2 件 5 折
 * @param {Array} productList An array about products with discount metadata.
 */
const discountRuleBuyOneGetOneHalf = (productList = []) => {
  const beforeAmount = productList.filter(o => !o.discountDescription).length;
  // Product list that without discount.
  const withoutDiscountList = productList.filter(o => !o.discountDescription);

  const groups = groupBy(withoutDiscountList, o => o.productID);
  const [firstGroup] = filter(groups, o => o.length >= 2);

  if (firstGroup) {
    const { description } = rulePriorities.find(
      o => o.rule === discountRuleBuyOneGetOneHalf
    );
    const [firstItem, secondItem] = firstGroup;
    // First item.
    firstItem.updatedPrice = firstItem.price;
    firstItem.discountDescription = description;
    // Second item.
    secondItem.updatedPrice = secondItem.price / 2;
    secondItem.discountDescription = description;
  }

  // Second item.
  const afterAmount = productList.filter(o => !o.discountDescription).length;

  // Doesn't finish, continue to next iteration,
  if (beforeAmount !== afterAmount) {
    discountRuleBuyOneGetOneHalf(productList);
  }
};

/**
 * Rule: [優惠活動 2] 任意商品(可相同也可不同)滿 3 件以上每件皆折 5 元
 * @param {Array} productList An array about products with discount metadata.
 */
const discountRuleReduceFiveForAllWithThreeAnyItems = (productList = []) => {
  const beforeAmount = productList.filter(o => !o.discountDescription).length;
  // Product list that without discount.
  const withoutDiscountList = productList.filter(o => !o.discountDescription);

  const [firstItem, secondItem, thirdItem] = withoutDiscountList;

  if (firstItem && secondItem && thirdItem) {
    const { description } = rulePriorities.find(
      o => o.rule === discountRuleReduceFiveForAllWithThreeAnyItems
    );

    [firstItem, secondItem, thirdItem].forEach(item => {
      item.updatedPrice = item.price - 5;
      item.discountDescription = description;
    });
  }

  // Second item.
  const afterAmount = productList.filter(o => !o.discountDescription).length;

  // Doesn't finish, continue to next iteration,
  if (beforeAmount !== afterAmount) {
    discountRuleBuyOneGetOneHalf(productList);
  }
};

/**
 * Lesser index means priority is higher.
 */
const rulePriorities = [
  {
    rule: discountRuleBuyOneGetOneHalf,
    description: "同商品第 2 件 5 折"
  },
  {
    rule: discountRuleReduceFiveForAllWithThreeAnyItems,
    description: "任意商品(可相同也可不同)滿 3 件以上每件皆折 5 元"
  }
];

/**
 * Iterate all discount rules.
 * @param {Object} products Products data object.
 * @param {Array} productIDs A string array.
 * @returns {Array} Array contains productID, name, price, updatedPrice and discountDescription.
 */
const mappingRules = (products = {}, productIDs = []) => {
  const rules = rulePriorities.map(o => o.rule);
  const discountedProductList = productIDs.map(id => clone(products[id]));

  // Apply rules, the variable 'discountedProductList' will be modified.
  rules.forEach(rule => rule(discountedProductList));

  mylogger("discountedProductList %j", discountedProductList);

  return discountedProductList;
};

/**
 * Iterate all discount rules.
 * @param {Array} discountedProductList Array contains productID, name, price, updatedPrice and discountDescription.
 * @returns {number} Sum of product price.
 */
const calculateTotalPrice = (discountedProductList = []) => {
  return sumBy(discountedProductList, o => o.updatedPrice || o.price);
};

/**
 * Iterate all discount rules.
 * @param {Object} products Products data object.
 * @param {Array} productIDs A string array.
 * @returns {number} Sum of product price.
 */
const checkout = (products, productIDs) => {
  const discountedProductList = mappingRules(products, productIDs);
  const sum = calculateTotalPrice(discountedProductList);

  return sum;
};

export { mappingRules, calculateTotalPrice, checkout };
