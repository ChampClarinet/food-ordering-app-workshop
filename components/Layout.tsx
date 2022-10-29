import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: FunctionComponent<{ children: any }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
