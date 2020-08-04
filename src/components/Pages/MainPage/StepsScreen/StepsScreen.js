import React, {useEffect, useState} from "react";
import Section from "../../../common/ui/section/section";
import Container from "../../../common/ui/container/Container";
import Row from "../../../common/ui/row/Row";
import Col from "../../../common/ui/col/Col";
import s from "./StepsScreen.module.scss";
import bg from "../../../../assets/setps-bg.jpg";
import {get} from "../../../../api";
import HOST_URL from "../../../../constants/constants";

const StepsScreen = () => {
  const [state, setState] = useState({steps: []});

  useEffect(() => {
    get(HOST_URL).then(res => {
      if (res && res.acf)
        setState({
          ...state, ...res.acf,
        });
    });

  }, []);

  return(
    <Section id="steps" style={{ backgroundImage: `url(${bg})` }} className={s.stepsScreen}>
      <Container>
        <Row>
          <Col lg={12}>
            <h2 className={'section-title'}>{state.stepsTitle}</h2>
            <div className={'section-subtitle'}>{state.stepsSubTitle}</div>
            <div className={s.steps}>
              {state.steps.map(({image, title}, key) => {
                return(
                  <div className={s.stepsItem} key={key}>
                    <div className={s.stepsItemImg}>
                      <img src={image} />
                    </div>
                    <h5 className={s.stepsItemTitle}>
                      {title}
                    </h5>
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default StepsScreen;
