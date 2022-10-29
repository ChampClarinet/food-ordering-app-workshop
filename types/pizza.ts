import { MongoDBObject } from ".";

export interface Pizza extends MongoDBObject {
  title: string;
  prices: number[];
  desc: string;
  img: string;
  extraOptions: PizzaOption[];
}

export interface PizzaOption extends MongoDBObject {
  text: string;
  price: number;
}