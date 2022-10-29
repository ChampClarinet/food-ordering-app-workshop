import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { FunctionComponent } from 'react';
import { Pizza } from '../types/pizza';

interface ServerSideData {
  pizzaList: Pizza[];
}

export interface HomePageProps extends ServerSideData { }

const Home: FunctionComponent<HomePageProps> = (props) => {
  const { pizzaList } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<ServerSideData> = async () => {
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      pizzaList: res.data,
    },
  }
}
