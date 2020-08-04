import React from "react";
import classNames from "classnames";
import "./Button.scss";

const Button = ({className, children, block, href, model, onClick}) => {
  const isBlock = block ? 'd-block' : "";
  return (
    <a onClick={onClick} href={href} className={classNames('btn', className, isBlock, model)}>{children}</a>
  )
};

export default Button;
