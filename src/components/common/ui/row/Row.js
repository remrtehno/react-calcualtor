import React from "react";
import classNames from "classnames";

const Row = ({className, children}) => {
  return (
    <div className={classNames(className, 'row')}>{children}</div>
  )
};

export default Row;
