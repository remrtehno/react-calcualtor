import React, {useState} from "react";
import s from "./HeaderBurger.module.scss";
import classNames from "classnames";
import nav1 from "../../../../../assets/calculator.png";
import nav2 from "../../../../../assets/audit.png";
import nav3 from "../../../../../assets/landscape.png";
import nav4 from "../../../../../assets/writing.png";

const HeaderBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.headerBurger}>
      <button className={s.navbarToggler} onClick={() => setIsOpen(!isOpen)} >
        <span className={classNames(s.navbarToggleIcon, isOpen ? s.close : '')}></span>
      </button>

      {isOpen ? (
        <div className={s.headerContent}>
          <div className={s.headerMenu}>
            <nav>
              <a href="#calculation">
                <img src={nav1} />
                <span className={"align-middle"}>Расчет стоимости забора</span>
              </a>
              <a href="#steps">
                <img src={nav2} />
                <span className={"align-middle"}>Этапы монтажа забора</span>
              </a>
              <a href="#gallery">
                <img src={nav3} />
                <span className={"align-middle"}>Наши работы</span>
              </a>
              <a href="#contacts">
                <img src={nav4} />
                <span className={"align-middle"}>Контакты</span>
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderBurger;
