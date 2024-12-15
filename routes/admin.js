const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title", "Title must be greater than 3 characters")
      .isLength({ min: 3 })
      .isString()
      .trim(), 
    body("price").isFloat(),
    body("description", "Description must be at least 6 characters")
      .isLength({ min: 6 })
      .trim(),
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  [
    body("title", "Title must be greater than 3 characters")
      .isLength({ min: 3 })
      .isString()
      .trim(), 
    body("price").isFloat(),
    body("description", "Description must be at least 6 characters")
      .isLength({ min: 6 })
      .trim(),
  ],
  adminController.postEditProduct
);

router.delete("/delete/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
