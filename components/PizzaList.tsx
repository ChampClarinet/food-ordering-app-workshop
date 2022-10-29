import { FunctionComponent } from "react";
import styles from "../styles/PizzaList.module.css";
import { Pizza } from "../types/pizza";
import PizzaCard from "./PizzaCard"

export interface PizzaListProps {
  pizzaList: Pizza[];
}

const PizzaList: FunctionComponent<PizzaListProps> = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
