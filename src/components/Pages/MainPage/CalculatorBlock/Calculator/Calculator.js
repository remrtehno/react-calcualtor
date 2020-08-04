import React, {useEffect, useState} from "react";
import s from "./Calculator.module.scss";
import Input from "../../../../common/Input/Input";
import Select from "react-select";
import SelectRadio from "../../../../common/SelectRadio/SelectRadio";
import Row from "../../../../common/ui/row/Row";
import Col from "../../../../common/ui/col/Col";
import classNames from "classnames";
import Button from "../../../../common/ui/button/Button";
import home from "../../../../../assets/home-mock.png";
import ColoredSelect from "../../../../common/ColoredSelect/ColoredSelect";
import OutputCells from "../OutputCells/OutputCells";
import {get} from "../../../../../api/index"
import {calcResult, calcSheetArea, calcMultiple, calcPillar} from "./helpers";
import {CALCULATOR_URL} from "../../../../../constants/constants";
import ReactHtmlParser from 'react-html-parser';


const map = (array = []) => {
  let result = array.map( ({label})=> {
    return { value: label, label: label };
  });
  result.push({value: 0, label: "Нет"});
  return result;
};

const widthGateOptions = (rows = []) => {
  let options = [{value: 0, label: "Нет"}];
  rows.map(obj => {
    options.push({
      label: obj.width,
      value: obj.width,
      obj: obj,
    });
  });
  return options;
};
const gateOptions = (rows = []) => {
  let options = [{value: 0, label: "Нет"}];
  rows.map(({name, gateVariations}) => {
    options.push({
      label: name,
      value: name,
      gateVariations: gateVariations,
    });
  });
  return options;
};
const colorOptions = (rows = []) => {
  let options = [];
  rows.map(({name, color, image}) => {
    options.push({
      label: name,
      value: name,
      color: color,
      img: image,
    });
  });
  return options;
};

const calcOptions = (rows = []) => {
  let options = {'Нет': '0'};

  rows.map(({name, price}) => {
    if (name) options[name] = price;
    return null;
  });

  let result = [];

  for (let [key, value] of Object.entries(options)) {
    result.push({label: key, value})
  }
  return result;
};

const Calculator = () => {
  const [total, setTotal] = useState({result: 0});
  const [state, setState] = useState({visual: null});

  const handleResult = () => {
    const sheetArea = calcSheetArea([total.fenceWidth, total.fenceHeight]);
    const corrugatedBoard = calcMultiple([sheetArea, total.corrugatedBoard]);
    const ContourLines = calcMultiple([total.fenceWidth, total.contourLines, total.contourLinesRows]);
    const work = calcMultiple([total.fenceWidth, state.work]);

    const countPillars = calcPillar({fenceWidth: total.fenceWidth, gate: total.gate, gateVariationsName: total.gateVariationsName });
    const pillars = calcMultiple([countPillars[0], total.pillarPrice, total.pillarsWidth]);

    const result = calcResult([
      corrugatedBoard,
      pillars,
      ContourLines,
      total.gateWidth && total.gateVariationsName ? total.gateWidth.price : 0,
      total.gate,
      total.primer,
      total.foundation,
      work
    ]);


    let corrugatedBoardName1 = (Number(total.fenceWidth)/1.15);
    let corrugatedBoardName2 = 0;
    if (total.gateWidth) {
      corrugatedBoardName2 = Number(total.gateWidth.additionalSheets)
    }
    let corrugatedBoardName3 = 0;
    if(total.gate) {
      corrugatedBoardName3 = Number(state.gate.additionalSheets);
    }

    let screws = 0;
    if(total.gate && state.gate) {
      screws = (Number(total.fenceWidth || 0) * 12) + Number(total.gateWidth.additionalScrews || 0) + Number(state.gate.additionalScrews);
    }

    let hinges = 0;
    if(total.gateWidth && total.gateWidth.additionalHinges) {
        hinges = Number(total.gateWidth.additionalHinges);
    }
    if(total.gate) {
      hinges += Number(state.gate.additionalHinges);
    }

    let contourLinesNameVal =
      (Number(total.fenceWidth || 0) * total.contourLinesRows || 1)
      + (total.gateWidth ? Number(total.gateWidth.additionalProftube) : 0)
      + (total.gate ? Number(state.gate.additionalProfTube) : 0);

    let pillarValue = ((Number(total.fenceWidth || 0) / 2.5 + Number(countPillars[1])) || 1) * Number(total.pillarsWidth);

    const outputCells = [
      {name: total.corrugatedBoardName,
        value: (corrugatedBoardName1 + corrugatedBoardName2 + corrugatedBoardName3).toFixed(),
        measure: 'шт'
      },
      {name: total.pillarName, value: pillarValue.toFixed(1), measure: 'шт' },
      {name: 'труб d=108 мм, со стеной 5,5 мм', value: total.gateWidth ? total.gateWidth.tube : 0, measure: 'п.м.' },
      {
        name: total.contourLinesName
          ?
          total.contourLinesName .replace('Профилированная', 'профилированных').replace('труба', 'труб')
          :
          "",
        value: contourLinesNameVal, measure: 'п.м.' },

      {name: 'саморезов 4,2*16 мм в цвет листа', value: screws, measure: 'шт' },
      {name: 'краски-грунт', value: (Number(total.fenceWidth || 0) / 8).toFixed(1), measure: 'кг' },
      {name: 'шарнир-петли', value: hinges, measure: 'шт' },
      {name: 'цемента', value: (Number(total.fenceWidth || 0) * 6).toFixed(), measure: 'кг' },
      {name: 'щебня', value: (Number(total.fenceWidth || 0) * 9).toFixed(), measure: 'кг' },
    ];

    setTotal({...total, result: result, outputCells: outputCells, });


  };

  useEffect(() => {
    if(CALCULATOR_URL) {
      get(CALCULATOR_URL).then(res => {
        if (res && res.calculator) setState({
          ...state, ...res.calculator,
          visual: res.calculator.fences ? res.calculator.fences[0].image : null,
        });
      });
    }
  }, []);

  return(
    <Row>
      <Col lg={12}>
        <h2 className={'section-title'}>{ReactHtmlParser(state.title)}</h2>
        <div className={'section-subtitle text-dark'}>{ReactHtmlParser(state.subtitle)} </div>
      </Col>
      <Col lg={6}>
        <div className={s.homeMockup}>
          <img src={home} className="img-fluid" />
          <img src={state.visual} className={s.homeFence} />
          <ColoredSelect
            placeholder="Выберите цвет"
            onChange={(e) => {
              setState({
                ...state,
                visual: e.img,
              })
            }}
            className={classNames(s.select, s.homeFenceSelect)}
            options={colorOptions(state.fences)}
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className={s.calculator}>
          <div className={s.grid}>
            <div className={s.inputControl}>
              <h4 className={s.title}>Параметры забора</h4>
              <Input
                onChange={ e => setTotal({...total, fenceWidth: e.target.value})}
                className={s.inputCells}
                placeholder={'Длина, м'}
              />
              <Input
                onChange={ e => setTotal({...total, fenceHeight: e.target.value})}
                className={s.inputCells}
                placeholder={'Высота, м'}
              />
            </div>
            <div className={s.inputControl}>
              <h4 className={s.title}>Параметры профлиста</h4>
              <Select
                className={s.select}
                closeMenuOnSelect={true}
                options={calcOptions(state.corrugatedBoard)}
                placeholder={'Вид'}
                onChange={ e => setTotal({...total, corrugatedBoard: e.value, corrugatedBoardName: e.label })}
              />
            </div>

            <div className={classNames(s.inputControl, s.fullRow)}>
              <h4 className={s.title}>Параметры столбов</h4>
              <Select
                placeholder={'Длина, м'}
                className={s.select}
                options={map(state.widthPillar)}
                onChange={ e => setTotal({...total, pillarsWidth: e.value })}
              />
              <Select
                placeholder={'Тип сечения трубы и размер'}
                className={classNames(s.select, s.grow)}
                options={calcOptions(state.pillars)}
                onChange={ e => setTotal({...total, pillarPrice: e.value, pillarName: e.label })}
              />
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Параметры горизонталей</h4>
              <Select
                className={classNames(s.select, s.grow)}
                options={calcOptions(state.contourLines)}
                placeholder={'Вид горизонтали'}
                onChange={ e => setTotal({...total, contourLines: e.value, contourLinesName: e.label })}
              />
              <Select
                placeholder={'Ряды'}
                className={s.select}
                options={state.contourLinesRows}
                onChange={ e => setTotal({...total, contourLinesRows: e.label })}
              />
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Калитка</h4>
              <SelectRadio
                isTrue={state.gate ? state.gate.price : null}
                onChange={ e => setTotal({...total, gate: e }) }
                name="gate"
              />
            </div>

            <div className={classNames(s.inputControl, s.fullRow)}>
              <h4 className={s.title}>Параметры ворот</h4>
              <Select
                className={classNames(s.select, s.grow)}
                options={gateOptions(state.gateVariations)}
                placeholder={'Вид'}
                onChange={ e => setTotal({...total, gateVariations: e.gateVariations, gateVariationsName: e.value,}) }
              />
              <Select
                isDisabled={!total.gateVariations}
                placeholder={'Длина, м'}
                className={classNames(s.select)}
                options={widthGateOptions(total.gateVariations)}
                onChange={ e => setTotal({...total, gateWidth: e.obj })}
              />
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Грунтовка каркаса</h4>
              <SelectRadio
                isTrue={state.primer}
                onChange={ e => setTotal({...total, primer: e }) }
                name="primer"
              />
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Наличие фундамента</h4>
              <SelectRadio
                isTrue={state.foundation}
                onChange={ e => setTotal({...total, foundation: e }) }
                name="foundation"
              />
            </div>
          </div>

          <div className={s.total}>
            Итого: <span>{total.result}</span>
          </div>
          <Button onClick={handleResult} className={classNames("btn-primary", s.calculateButton)}>Рассчитать</Button>
        </div>
      </Col>
      <Col lg={12}>
        <OutputCells cells={total.outputCells}/>
      </Col>
    </Row>
  )
};

export default Calculator;
