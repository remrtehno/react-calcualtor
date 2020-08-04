import React from "react";
import Section from "../../../common/ui/section/section";
import Row from "../../../common/ui/row/Row";
import Col from "../../../common/ui/col/Col";
import Container from "../../../common/ui/container/Container";
import Form from "../../../common/Form/Form";
import Input from "../../../common/Input/Input";
import img from "../../../../assets/write-us-img.png";
import s from "./WriteUsScreen.module.scss";
import isDesktop from "../../../../utils/isDesktop";
import {HOST_ORIGIN} from "../../../../constants/constants";


const WriteUsScreen = () => {
  return(
    <Section id="contacts" className={s.writeUs}>
      <Container>
        <Row>
          <Col lg={5}>
            <h2 className="small-title mb-4"><span className="blue">НапишиТЕ нам</span></h2>
            <div className="subtitle mb-5">Задайте свой вопрос в форму ниже <br/>
              и мы ответим на него в ближайшее время</div>
            <Form className={s.form} submit={'Отправить'} action={`${HOST_ORIGIN}/wp-json/contact-form-7/v1/contact-forms/113/feedback`}>
              <Input
                name='your-name'
                small
                placeholder={'Ваше имя'}
              />
              <Input
                name='your-tel'
                small
                placeholder={'Ваш номер телефона'}
              />
              <textarea name='your-message' placeholder={"Ваше сообщение..."} rows={5} ></textarea>
            </Form>
          </Col>
          {
            isDesktop
              ? <Col lg={7}>
                  <img src={img} className={s.rightSideImg}/>
                </Col>
              : null
          }
        </Row>
      </Container>
    </Section>
  );
};

export default WriteUsScreen;
