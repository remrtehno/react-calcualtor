import React, {useEffect, useState} from 'react';
import Container from "../../ui/container/Container";
import Row from "../../ui/row/Row";
import Col from "../../ui/col/Col";
import "./Footer.scss";
import {get} from "../../../../api";
import HOST_URL from "../../../../constants/constants";

function Footer() {
  const [state, setState] = useState({});

  useEffect(() => {
    get(HOST_URL + 'footer').then(res => {
      if (res.footer)
        setState(res.footer);
    });

  }, []);


  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={5}>
            <div className={'logo'}>
              <a href={'/'}>
                <img src={state.logo} alt={'Профессиональный монтаж забора из профлиста'} className={'img-fluid'}/>
              </a>
            </div>
          </Col>
          <Col lg={7}>
            <div className="footer-nav text-lg-right text-center">
              <nav>
                <a href={'#steps'}>Этапы монтажа</a>
                <a href={'#calculator'}>Расчет стоимости</a>
                <a href={'#gallery'}>Наши работы</a>
                <a href={'#contacts'}>Контакты</a>
              </nav>
            </div>
          </Col>
          <Col lg={12}>
            <div className="text-center footer-small-links">
              <a href={state.privacy_policy}><u>Политика конфиденциальности</u></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
