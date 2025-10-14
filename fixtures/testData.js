// Test data fixtures for reusable test data

export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  lockedOut: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problem: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitch: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  invalid: {
    username: "invalid_user",
    password: "wrong_password",
  },
};

export const checkoutInfo = {
  valid: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345",
  },
  alternative: {
    firstName: "Jane",
    lastName: "Smith",
    postalCode: "54321",
  },
  specialCharacters: {
    firstName: "John-Paul O'Brien",
    lastName: "Smith-Jones",
    postalCode: "12345-6789",
  },
};

export const products = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
  boltTShirt: "Sauce Labs Bolt T-Shirt",
  fleeceJacket: "Sauce Labs Fleece Jacket",
  onesie: "Sauce Labs Onesie",
  tShirtRed: "Test.allTheThings() T-Shirt (Red)",
};

export const prices = {
  backpack: 29.99,
  bikeLight: 9.99,
  boltTShirt: 15.99,
  fleeceJacket: 49.99,
  onesie: 7.99,
  tShirtRed: 15.99,
};

export const sortOptions = {
  nameAsc: "az",
  nameDesc: "za",
  priceLowHigh: "lohi",
  priceHighLow: "hilo",
};
