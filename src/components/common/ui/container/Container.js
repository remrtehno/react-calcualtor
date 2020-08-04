import React from "react";
import classNames from "classnames";

const Container = ({className, children}) => {
  return (
    <div className={classNames('container', className)}>{children}</div>
  )
};

export default Container;
