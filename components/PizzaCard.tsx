import Image from "next/image";
import { FunctionComponent } from "react";
import styles from "../styles/PizzaCard.module.css";
import { Pizza } from "../types/pizza";
import Link from "next/link";

export interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard: FunctionComponent<PizzaCardProps> = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link passHref href={`/product/${pizza._id}`}>
      <Image src="/img/pizza.png" alt="" width={300} height={300} />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
    </div>
  );
};

export default PizzaCard;
