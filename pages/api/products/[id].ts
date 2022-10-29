import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import dbConnect from '../../../utils/mongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      return get(req, res, id as string);
    case 'PUT':
      return put(req, res);
    case 'DELETE':
      return del(req, res);
    default:
      return res.status(405);
  }
}

export default handler;

const get = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  dbConnect();

  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
}