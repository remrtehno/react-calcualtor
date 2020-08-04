import React, {useEffect, useState} from 'react';
import Container from "../../ui/container/Container";
import Row from "../../ui/row/Row";
import './Header.scss';
import Marker from "../../../../assets/marker.png";
import blueTel from "../../../../assets/tel-blue.png";
import whatsapp from "../../../../assets/wh.png";
import viber from "../../../../assets/vb.png";
import nav1 from "../../../../assets/calculator.png";
import nav2 from "../../../../assets/audit.png";
import nav3 from "../../../../assets/landscape.png";
import nav4 from "../../../../assets/writing.png";
import Col from "../../ui/col/Col";
import {get} from "../../../../api";
import HOST_URL from "../../../../constants/constants";
import isDesktop from "../../../../utils/isDesktop";
import HeaderBurger from "./HeaderBurger/HeaderBurger";



function Header() {
  const [state, setState] = useState({});

  useEffect(() => {
      get(HOST_URL).then(res => {
        if (res && res.acf)
          setState({
            ...state, ...res.acf,
          });
      });

  }, []);

  return (
      <header className="header">
        <div className="py-2">
          <Container>
          <Row>
            <Col lg={6}>
              <div className={'logo'}>
                <a href={'/'}>
                  <img src={state.logo} alt={'Профессиональный монтаж забора из профлиста'} className={'img-fluid'}/>
                </a>
              </div>
            </Col>
            <Col lg={3}>
              <div className={'marker'}>
                <img src={Marker} />
                г. Сургут
              </div>
            </Col>
            <Col lg={3}>
              <div className={'text-center text-lg-right tel-wrapper'}>
                <a href={`tel:${state.phone_number_1}`} className={'d-block blue-tel'}>
                  <img src={blueTel} />
                  {state.phone_number_1}
                </a>
                <a className={'mr-1'} href={`whatsapp://send?phone=${state.phone_whatsapp}`}>
                  <img src={whatsapp} />
                </a>
                <a className={'mr-2'} href={`viber://chat?number=${state.phone_viber}`}>
                  <img src={viber} />
                </a>
                <a href={`tel:${state.phone_number_2}`}>{state.phone_number_2}</a>
                <span className={'d-block days'}>Пн-вс с 8.00 до 21.00</span>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
        <div className={'header-nav'}>
          <Container className='p-0'>
            {
              isDesktop
                ?
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
                :
                <HeaderBurger/>
            }
          </Container>
        </div>
      </header>
  );
}

export default Header;
