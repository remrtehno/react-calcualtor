import React from "react";
import classNames from "classnames";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Page = ({className, children}) => {
  return (
    <div className={classNames(className, 'page')}>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default Page;
