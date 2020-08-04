import React, {useEffect, useState} from "react";
import Section from "../../../common/ui/section/section";
import Container from "../../../common/ui/container/Container";
import Row from "../../../common/ui/row/Row";
import Col from "../../../common/ui/col/Col";
import Input from "../../../common/Input/Input";
import Form from "../../../common/Form/Form";
import s from "./FormSection.module.scss";
import {get} from "../../../../api";
import HOST_URL, {HOST_ORIGIN} from "../../../../constants/constants";
import ReactHtmlParser from 'react-html-parser';


const FormSection = () => {
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
    <Section className={s.formSection}>
      <Container>
        <Row>
          <Col lg={6}>
            <h2 className={'small-title mb-3'}>{ReactHtmlParser(state.smetaTitle)}</h2>
            <div className={'font-weight-light'}>{state.smetaSubtitle}</div>
          </Col>
          <Col lg={6}>
            <h4 className={s.formSectionTitle}>{state.smetaTitleForm}</h4>
            <Form action={`${HOST_ORIGIN}/wp-json/contact-form-7/v1/contact-forms/110/feedback`} submit={'Жду звонка'}>
              <Input
                name="your-name"
                placeholder={'Номер телефона'}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default FormSection;
