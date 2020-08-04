import React from "react";
import classNames from "classnames";
import "./Section.scss";

const Section = ({className, id, children, style, bg}) => {
  return(
    <section id={id} style={style} className={classNames(className, 'default-offset')}>{children}</section>
  );
};

export default Section;
