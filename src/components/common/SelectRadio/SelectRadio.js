import React from "react";
import s from "./SelectRadio.module.scss";
import classNames from "classnames";

const SelectRadio = ({name, onChange, isTrue}) => {
  return(
    <div className={classNames(name, s.parent)}>
      <label className={classNames(s.check, s.option)}>
        <input onChange={() => onChange(isTrue || 1)} className={s.check__input} type="radio" value="1" name={name} />
        <span className={s.check__box}>Да</span>
      </label>
      <label className={classNames(s.check, s.option)}>
        <input onChange={() => onChange(0)} className={s.check__input} type="radio" value="0" name={name} />
        <span className={s.check__box}>Нет</span>
      </label>
    </div>
  )
};

export default SelectRadio;
