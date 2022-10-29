import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import dbConnect from '../../../utils/mongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return get(req, res);
    case 'POST':
      return post(req, res);
    default:
      return res.status(405);
  }
}

export default handler;

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();

  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
}