import React, {useState, Fragment} from "react"
import {usePopper} from 'react-popper';
import s from "./Popover.module.scss";

export default function Popover({children, className}) {
  const [hide, setHide] = useState(true);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    modifiers: [{name: 'arrow', options: {element: arrowElement,}}],
    placement: "right",
  });

  const onMouseEnter = () => {
    setHide(false);
  };

  const onMouseLeave = () => {
    setHide(true);
  };


  return (
    <Fragment>
      <button type="button" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={setReferenceElement}
        className={className}></button>
      {
        hide
          ?
          ""
          :
          <div className={s.tooltip} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            {children}
            <div ref={setArrowElement} style={styles.arrow} className={s.arrow}/>
          </div>
      }
    </Fragment>
  )
}
