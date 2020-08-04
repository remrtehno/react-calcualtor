import React from "react";
import Row from "../../../../common/ui/row/Row";
import Col from "../../../../common/ui/col/Col";
import s from "./OutputCells.module.scss";
import {outputCells} from "../../../../../mocks/mocks";


const OutputCells = ({cells = outputCells}) => {

  return(
    <Row>
      <Col lg={12}>
        <h4 className={s.title}>Для строительства забора Вам потребуется:</h4>
      </Col>
      {cells.map( ({name, value, measure}, key) => {
        if(!name || name === 'Нет') return ;
        return(
          <Col lg={4} key={key}>
            <div className={s.outputCell}>
              <div className={s.outputNumber}>{value}</div>
              <span className={s.text}>{measure} {name}</span>
            </div>
          </Col>
        )
      })}
    </Row>
  )
};

export default OutputCells;
