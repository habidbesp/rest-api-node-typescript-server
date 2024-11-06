import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["price", "DESC"]],
  });
  res.json({ data: products });
};

export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ error: "Product not Found" });
    return;
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ error: "Product not Found" });
    return;
  }

  const updatedProduct = await product.update(req.body);

  res.json({ data: updatedProduct });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ error: "Product not Found" });
    return;
  }

  product.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ error: "Product not Found" });
    return;
  }

  await product.destroy();
  res.json({ data: "Product successful deleted" });
};
