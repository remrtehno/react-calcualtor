import React from "react";
import Section from "../../../common/ui/section/section";
import s from "./CalclatorScreen.module.scss";
import Container from "../../../common/ui/container/Container";
import Row from "../../../common/ui/row/Row";
import Col from "../../../common/ui/col/Col";
import Calculator from "./Calculator/Calculator";


const CalculatorBlock = () => {
  return(
    <Section id="calculation" className={s.calculatorScreen}>
      <Container>
        <Row>
          <Col lg={12}>
            <Calculator/>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default CalculatorBlock;
