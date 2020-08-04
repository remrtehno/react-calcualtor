import React, {useState} from "react";
import "./Form.scss";
import post from "../../../api/usePostRequest";
import classNames from "classnames";

const Form = ({className, children, submit, action}) => {
  const [state, setState] = useState(null);
  const handleSubmit = (e) => {
    setState({});
    e.preventDefault();
    const form = e.target;
    post(action, new FormData(form)).then((e)=> {
      if(e.status === "mail_sent") {
        setState({message: e.message, className: 'alert-success'});
        form.reset();
      } else {
        setState({message: e.message, className: 'alert-danger'});
      }
    });
  };

  return(
    <form className={className} onSubmit={handleSubmit}>
      {children}
      <button type="submit" className={'btn btn-primary'}>{submit}</button>
      { state ? <div className={classNames(state.className, "alert position-absolute form-alert")}>{state.message}</div> : ''}
    </form>
  );
};

export default Form;
