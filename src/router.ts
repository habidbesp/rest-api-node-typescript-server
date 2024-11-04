import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router();

// Routing
router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  getProductsById
);

router.post(
  "/",
  // Validation
  body("name").notEmpty().withMessage("Product name can't be empty"),

  body("price")
    .isNumeric()
    .withMessage("Invalid Value")
    .notEmpty()
    .withMessage("Product price can't be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid Price"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  body("name").notEmpty().withMessage("Product name can't be empty"),

  body("price")
    .isNumeric()
    .withMessage("Invalid Value")
    .notEmpty()
    .withMessage("Product price can't be empty")
    .custom((value) => value > 0)
    .withMessage("Invalid Price"),
  body("availability")
    .isBoolean()
    .withMessage("Invalid Value for disponibility, provide: true or false"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
