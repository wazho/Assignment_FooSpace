// Node modules.
import React, { useState, useCallback } from "react";
import { Input, Button, Divider } from "semantic-ui-react";
// Local components.
import DiscountTable from "./DiscountTable";
// Local modules.
import { getProductsByIDs } from "../../utils/productInfo";
import { mappingRules, checkout } from "../../utils/rules";
import { logger } from "../../utils/logger";

// Create logger.
const mylogger = logger("DiscountCalculator");

const stringify = productIDs => productIDs.map(o => `"${o}"`).join(", ");
const unstringify = productIDs =>
  productIDs.split(",").map(s => s.trim().replace(/"/g, ""));

const DiscountCalculator = () => {
  // Local states.
  const [productIDs, setProductIDs] = useState([
    "003",
    "002",
    "003",
    "003",
    "004"
  ]);
  const [inputText, setInputText] = useState(stringify(productIDs));
  const [totalPrice, setTotalPrice] = useState(null);
  const [productList, setProductList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Update inputText when input modified.
  const inputHandler = useCallback(({ target }) => {
    const newValue = target.value;
    // Update display text.
    setInputText(newValue);
    // Update actual value.
    const newProductIDs = unstringify(newValue);
    setProductIDs(newProductIDs);
  }, []);

  // submitHandler: the checkout function.
  const submitHandler = useCallback(() => {
    try {
      const products = getProductsByIDs(productIDs);

      const discountedProductList = mappingRules(products, productIDs);
      const sum = checkout(products, productIDs);

      // Update data.
      setTotalPrice(sum);
      setProductList(discountedProductList);
      // Initial error message.
      setErrorMessage(null);
    } catch (e) {
      mylogger("Error Message %j", e.message);
      mylogger("Error Stack %j", e.stack);

      // Update data.
      setTotalPrice(null);
      setProductList([]);
      // Set error message.
      setErrorMessage("Error! Check console.");
    }
  }, [productIDs]);

  return (
    <div>
      <Input
        className="input"
        fluid
        placeholder={`"003", "002", "003", "003", "004"`}
        defaultValue={inputText}
        onChange={inputHandler}
      />

      <Button primary onClick={submitHandler}>
        Calculate
      </Button>

      {totalPrice && [
        <Divider />,
        <p>Your price is ${totalPrice}</p>,
        <Divider />,
        <DiscountTable productList={productList} />
      ]}

      {errorMessage && [<Divider />, <p>{errorMessage}</p>]}
    </div>
  );
};

export default DiscountCalculator;
