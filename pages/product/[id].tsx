import styles from "../../styles/Product.module.css";
import Image from "next/image";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Pizza, PizzaOption } from "../../types/pizza";
import axios from "axios";
import { GetServerSideProps } from "next";

interface ServerSideData {
  pizza: Pizza;
}
interface ProductModuleProps extends ServerSideData { }

const Product: FunctionComponent<ProductModuleProps> = (props) => {
  const { pizza } = props;

  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState<PizzaOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleChangePrice = useCallback((num: number) => {
    setPrice(price + num);
  }, [price]);

  const handleSize = useCallback((sizeIndex: number) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    handleChangePrice(diff);
  }, [handleChangePrice, pizza.prices, size]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, option: PizzaOption) => {
    const checked = e.target.checked;
    if (checked) {
      handleChangePrice(option.price);
      setExtras(prev => [...prev, option]);
    } else {
      handleChangePrice(-option.price);
      setExtras(prev => prev.filter(extra => extra._id !== option._id));
    }
  }, [handleChangePrice]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} style={{ objectFit: 'contain' }} fill alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/img/size.png" fill alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={e => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div> 
        <div className={styles.add}>
          <input onChange={e => setQuantity(+e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps<ServerSideData> = async ({ params }) => {
  const id = params?.id || '';
  const res = await axios.get(`http://localhost:3000/api/products/${id}`);
  return {
    props: {
      pizza: res.data,
    },
  }
}
