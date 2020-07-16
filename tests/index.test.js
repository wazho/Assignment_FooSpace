// Local modules.
import { getProductsByIDs } from "../src/utils/productInfo";
import { checkout } from "../src/utils/rules";

it("Should get 0 if nothing is purchased", () => {
  const productIDs = [];
  const products = getProductsByIDs(productIDs);
  const actual = checkout(products, productIDs);

  expect(actual).toBe(0);
});

it("Basic case from question", () => {
  const productIDs = ["003", "002", "003", "003", "004"];
  const products = getProductsByIDs(productIDs);
  const actual = checkout(products, productIDs);

  expect(actual).toBe(232.5);
});

it("Only Rule A", () => {
  const productIDs = ["001", "001"];
  const products = getProductsByIDs(productIDs);
  const actual = checkout(products, productIDs);

  expect(actual).toBe(67.5);
});

it("Rule A for twice", () => {
  const productIDs = ["001", "001", "001", "001", "001"];
  const products = getProductsByIDs(productIDs);
  const actual = checkout(products, productIDs);

  expect(actual).toBe(180);
});

it("Only Rule B", () => {
  const productIDs = ["001", "002", "003"];
  const products = getProductsByIDs(productIDs);
  const actual = checkout(products, productIDs);

  expect(actual).toBe(135);
});

it("Unknown item", () => {
  let actual;

  try {
    const productIDs = ["999"];
    const products = getProductsByIDs(productIDs);
    actual = checkout(products, productIDs);
  } catch (e) {
    // This is a special case.
  }

  expect(actual).toBe(undefined);
});
