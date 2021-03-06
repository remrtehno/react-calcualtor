import React from "react";
import "./Input.scss";
import classNames from "classnames";

const Input = ({placeholder, message, describe, value, name, type, label, small, className, onChange, required}) => {
  return (
    <div
      className="input-group">
      {label ? <label>{label}</label> : ""}
      <input
        type={type || 'text'}
        onChange={onChange}
        className={classNames('form-control', className, small ? 'small' : '')}
        name={name}
        placeholder={placeholder}
        aria-label={message}
        aria-describedby={describe}
        value={value}
      />
      <span className='required-field'>{required ? 'обязательное поле' : ''}</span>
    </div>
  );
};

export default Input;
