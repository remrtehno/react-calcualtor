import React from "react";
import classNames from "classnames";

const Col = ({className, children, lg}) => {
  return (
    <div className={classNames(`col-lg-${lg}`, className)}>{children}</div>
  )
};

export default Col;
