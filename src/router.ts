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

/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The Product ID
 *                    example: 1
 *                name:
 *                    type: string
 *                    description: The Product name
 *                    example: 49-inch curved monitor
 *                price:
 *                    type: number
 *                    description: The Product price
 *                    example: 300.67
 *                availability:
 *                    type: boolean
 *                    description: The Product availability
 *                    example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Returns a List of products
 *        tags:
 *            - Products
 *        description: Get All Products from DB
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: "#/components/schemas/Product"
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Returns a product by ID
 *        tags:
 *            - Products
 *        description: Get a product based on its unique ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrive
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/Product"
 *            404:
 *                description: Not found
 *            400:
 *                description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  getProductsById
);

/**
 * @swagger
 * /api/products:
 *    post:
 *        summary: Create a new product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: 49-inch curved monitor
 *                            price:
 *                                type: number
 *                                example: 300.67
 *        responses:
 *            201:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/Product"
 *            400:
 *                description: Bad Request - invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *        summary: Updates a product with user input
 *        tags:
 *            - Products
 *        description: Returns the updated product
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrive
 *            required: true
 *            schema:
 *                type: integer
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: 49-inch curved monitor
 *                            price:
 *                                type: number
 *                                example: 300.67
 *                            availability:
 *                                type: boolean
 *                                example: true
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/Product"
 *            400:
 *                description: Bad Request - Invalid ID or invalid input data
 *            404:
 *                description: Product Not Found
 */
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
    .withMessage("Invalid Value for availability"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *        summary: Update product availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrive
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/components/schemas/Product"
 *            400:
 *                description: Bad Request - Invalid ID
 *            404:
 *                description: Product Not Found
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *        summary: Delete a product in the database
 *        tags:
 *            - Products
 *        description: Returns a message "Product successful deleted"
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrive
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: string
 *                            value: "Product successful deleted"
 *            400:
 *                description: Bad Request - Invalid ID
 *            404:
 *                description: Product Not Found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("Invalid ID"),
  handleInputErrors,
  deleteProduct
);

export default router;
