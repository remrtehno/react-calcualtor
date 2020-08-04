import React, {useEffect, useState} from "react";
import s from "./FirstScreen.module.scss";
import Container from "../../../common/ui/container/Container";
import Row from "../../../common/ui/row/Row";
import Col from "../../../common/ui/col/Col";
import bgDesktop from "../../../../assets/first-screen.png";
import bgMobile from "../../../../assets/first-screen-mobile.png";
import fenceDesktop from "../../../../assets/fence-desktop.png";
import fenceMobile from "../../../../assets/fence-mobile.png";
import Button from "../../../common/ui/button/Button";
import Section from "../../../common/ui/section/section";
import classNames from "classnames";
import isDesktop from "../../../../utils/isDesktop";
import {get} from "../../../../api";
import HOST_URL from "../../../../constants/constants";
import ReactHtmlParser from 'react-html-parser';



const FirstScreen = () => {
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
    <Section className={s.firstScreen} style={{ backgroundImage: isDesktop ? `url(${bgDesktop})` : `url(${bgMobile})` }} >
      <Container>
        <Row>
          <Col lg={'12'}>
            <h3 className={s.topHeading}>{ReactHtmlParser(state.top_title)}</h3>
            <h1>{ReactHtmlParser(state.title)}</h1>
            <h5 className={s.subtitle}>{ReactHtmlParser(state.subtitle)}</h5>
            <Button className={classNames('btn-primary', s.btn)} href="#calculation">
              Рассчитать стоимость
            </Button>
            <div className="text-center">
              <img src={isDesktop ? fenceDesktop : fenceMobile} className={s.fence}/>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default FirstScreen;
