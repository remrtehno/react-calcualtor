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
import {createPopper} from '@popperjs/core';
import Popover from "../../../../common/ui/Popover/Popover";


const map = (array = []) => {
  let result = array.map(({label}) => {
    return {value: label, label: label};
  });
  result.push({value: 0, label: "Нет"});
  return result;
};

const widthGateOptions = (rows = []) => {
  let options = [];
  rows.map(obj => {
    options.push({
      label: obj.width,
      value: obj.width,
      obj: obj,
    });
  });
  options.push({value: 0, label: "Нет"});
  return options;
};
const gateOptions = (rows = []) => {
  let options = [];
  rows.map(({name, gateVariations}) => {
    options.push({
      label: name,
      value: name,
      gateVariations: gateVariations,
    });
  });
  options.push({value: 0, label: "Нет"});
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
  let options = {};

  rows.map(({name, price}) => {
    if (name) options[name] = price;
    return null;
  });

  Object.assign(options, {'Нет': '0'});

  let result = [];

  for (let [key, value] of Object.entries(options)) {
    result.push({label: key, value})
  }
  return result;
};

const Calculator = () => {
  const [total, setTotal] = useState({
    result: 0,
    gate: 0,
    gatePrice: 0,
  });
  const [state, setState] = useState({
    visual: null,
    additionalScrews: 0,
    fenceHeight: 0,
    fenceWidth: 0,
  });
  const [requiredFields, setRequiredFields] = useState({fenceWidth: null, fenceHeight: null});


  const button = document.querySelector('#button');
  const tooltip = document.querySelector('#tooltip');

  createPopper(button, tooltip, {
    placement: 'right',
  });

  const handleResult = () => {
    const sheetArea = calcSheetArea([total.fenceWidth, total.fenceHeight]);
    const corrugatedBoard = calcMultiple([sheetArea, total.corrugatedBoard]);
    const ContourLines = calcMultiple([total.fenceWidth, total.contourLines, total.contourLinesRows]);
    const work = calcMultiple([total.fenceWidth, state.work]);

    if (!total.fenceWidth) {
      setRequiredFields({...requiredFields, fenceWidth: true,});
      return;
    } else {
      setRequiredFields({...requiredFields, fenceWidth: null});
    }
    if (!total.fenceHeight) {
      setRequiredFields({...requiredFields, fenceHeight: true,});
      return;
    } else {
      setRequiredFields({...requiredFields, fenceHeight: null});
    }


    const countPillars = calcPillar({
      fenceWidth: total.fenceWidth,
      gate: total.gatePrice,
      gateVariationsName: total.gateVariationsName
    });

    const pillars = calcMultiple([countPillars[0], total.pillarPrice, total.pillarsWidth]);


    //НАЛИЧИЕ ЛЕНТОЧНОГО ФУНДАМЕНТА
    let foundationValue = 0;
    if(total.foundation) {
      foundationValue = total.fenceWidth * 2000;
    }

    const result = calcResult([
      corrugatedBoard,
      pillars,
      ContourLines,
      total.gateWidth && total.gateVariationsName ? total.gateWidth.price : 0,
      total.gatePrice,
      total.primer,
      foundationValue,
      work
    ]);


    let corrugatedBoardName1 = (Number(total.fenceWidth) / 1.15);
    let corrugatedBoardName2 = 0;
    if (total.gateWidth) {

      corrugatedBoardName2 = Number(total.gateWidth.additionalSheets)
    }
    let corrugatedBoardName3 = 0;
    if (total.gatePrice) {

      corrugatedBoardName3 = Number(state.gate.additionalSheets);
    }
    console.log('if yes ',corrugatedBoardName3,  Number(state.gate.additionalSheets), total.gatePrice );

    let screws = 0;
    //if (total.gate && state.gate) {
    screws = (Number(total.fenceWidth || 0) * 12) + Number(total.gateWidth ? total.gateWidth.additionalScrews : 0) + Number(state.gate.additionalScrews || 0);
    //}

    let hinges = 0;
    if (total.gateWidth && total.gateWidth.additionalHinges) {
      hinges = Number(total.gateWidth.additionalHinges);
    }
    if (total.gate) {
      hinges += Number(state.gate.additionalHinges);
    }


    let contourLinesNameVal =
      (Number(total.fenceWidth || 0) * total.contourLinesRows || 1)
      + (total.gateWidth ? Number(total.gateWidth.additionalProftube) : 0)
      + (total.gate ? Number(state.gate.additionalProfTube) : 0);

    //  (=(длина забора/3+расчет добавления количества столбов)*длина забора в зависимости от высоты*стоимость столба за 1 м.п.)
    let widthColsPillars = Math.round(Number(total.fenceWidth || 0) / 3);
    let pillarValue = Math.round(((widthColsPillars + Number(countPillars[1])) || 1) * Number(total.pillarsWidth));

    let outputCells = [
      {
        name: total.corrugatedBoardName,
        value: (corrugatedBoardName1 + corrugatedBoardName2 + corrugatedBoardName3).toFixed(),
        measure: 'шт'
      },
      {name: total.pillarName, value: pillarValue, measure: 'п.м.'},


      {
        name: total.contourLinesName
          ?
          total.contourLinesName.replace('Профилированная', 'профилированных').replace('труба', 'труб')
          :
          "",
        value: contourLinesNameVal, 
        measure: 'п.м.'
      },

      {name: 'саморезов 4,2*16 мм в цвет листа', value: screws, measure: 'шт'},
      {name: 'краски-грунт', value: (Number(total.fenceWidth || 0) / 8).toFixed(1), measure: 'кг'},
      {name: 'шарнир-петли', value: hinges, measure: 'шт'},
      {name: 'цемента', value: (Number(total.fenceWidth || 0) * 6).toFixed(), measure: 'кг'},
      {name: 'щебня', value: (Number(total.fenceWidth || 0) * 9).toFixed(), measure: 'кг'},
    ];

    if(total.gateVariations)
      outputCells.splice(2, 0,  {name: 'труб d=108 мм, со стеной 5,5 мм', value: total.gateWidth ? total.gateWidth.tube : 0, measure: 'п.м.'},);


    setTotal({...total, result: result, outputCells: outputCells,});


  };

  useEffect(() => {
    if (CALCULATOR_URL) {
      get(CALCULATOR_URL).then(res => {
        if (res && res.calculator) setState({
          ...state, ...res.calculator,
          visual: res.calculator.fences ? res.calculator.fences[0].image : null,
        });
      });
    }
  }, []);

  return (
    <Row>
      <Col lg={12}>
        <h2 className={'section-title'}>{ReactHtmlParser(state.title)}</h2>
        <div className={'section-subtitle text-dark'}>{ReactHtmlParser(state.subtitle)} </div>
      </Col>
      <Col lg={6}>
        <div className={s.homeMockup}>
          <img src={home} className="img-fluid"/>
          <img src={state.visual} className={s.homeFence}/>
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
              <h4 className={s.title}>Геометрические параметры забора</h4>
              <div className='position-relative'>
                <Popover className={s.buttonTip}>
                  Общая длина забора без учета ворот и калитки
                </Popover>
                <Input
                  required={requiredFields.fenceWidth}
                  onChange={e => setTotal({...total, fenceWidth: e.target.value})}
                  className={s.inputCells}
                  placeholder={'Длина, м *'}
                />
              </div>
              <div className='position-relative'>
                <Select
                  className={s.select}
                  closeMenuOnSelect={true}
                  options={[
                    {value: 1.5, label: 1.5, widthPillar: 2.0},
                    {value: 1.8, label: 1.8, widthPillar: 2.4},
                    {value: 2, label: 2, widthPillar: 2.7},
                    {value: 2.2, label: 2.2, widthPillar: 3.0}
                    ]}
                  placeholder={'Высота, м *'}
                  onChange={e => setTotal({...total, fenceHeight: e.value, pillarsWidth: e.widthPillar, })}
                />
                <Popover className={s.buttonTip}>
                  Стандартная высота забора изменяется от 1,5 до 2,2 м. Другая высота также возможна, но рассчитывается
                  индивидуально.
                </Popover>
              </div>
            </div>
            <div className={s.inputControl}>
              <h4 className={s.title}>Параметры профлиста</h4>
              <div className="position-relative">
                <Select
                  className={classNames(s.select, s.nowrap)}
                  closeMenuOnSelect={true}
                  options={calcOptions(state.corrugatedBoard)}
                  placeholder={'Вид'}
                  onChange={e => setTotal({...total, corrugatedBoard: e.value, corrugatedBoardName: e.label})}
                />
                <Popover className={s.buttonTip}>
                  Оцинкованный лист - более дешевый вариант. Крашеный лист смотрится более эстетично и является наиболее
                  востребованным. Цвет листа можно подобрать на макете слева и посмотреть как это будет выглядеть. <br/> Толщина листа 0,45 мм придает листу большую жесткость, при этом, влечет удорожание примерно на 30%
                </Popover>
              </div>
            </div>

            <div className={classNames(s.inputControl, s.fullRow)}>
              <h4 className={s.title}>Параметры столбов</h4>

              <div className="position-relative">
                <Select
                  placeholder={'Тип сечения трубы и размер'}
                  className={classNames(s.select, s.grow)}
                  options={calcOptions(state.pillars)}
                  onChange={e => setTotal({...total, pillarPrice: e.value, pillarName: e.label})}
                />
                <Popover className={s.buttonTip}>
                  Стандартный тип наиболее используемой трубы НКТ d=73мм. Если желаете придать эстетичный вид своему
                  забору, то рекомендуем использовать проф. трубу 80х80мм, но это вызовет удорожание забора.
                  <br/>
                  <br/>
                  НКТ - Насосно-компрессорная труба круглого сечения. <br/>
                  Проф. труба – профилированная труба квадратного сечения.
                </Popover>
              </div>
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Параметры горизонталей</h4>
              <div className='position-relative'>
                <Select

                  className={classNames(s.select, s.grow, s.smallDropDown)}
                  options={calcOptions(state.contourLines)}
                  placeholder={'Вид'}
                  onChange={e => setTotal({...total, contourLines: e.value, contourLinesName: e.label})}
                />
                <Popover className={s.buttonTip}>
                  Лага крепится к столбам при помощи сварки и на нее прикручивается профлист. Рекомендуем использовать
                  тип лаги 40х20х2мм, она более прочная и не существенно дороже проф. трубы 40х20х1,5мм.
                </Popover>
              </div>
              <div className='position-relative'>
                <Select
                  placeholder={'Ряды'}
                  className={s.select}
                  options={state.contourLinesRows}
                  onChange={e => setTotal({...total, contourLinesRows: e.label})}
                />
                <Popover className={s.buttonTip}>
                  Количество горизонтальных лаг в одном пролете между столбами. Чем больше лаг, тем прочнее конструкция.
                  Для забора до 2 м в высоту достаточно 2 лаг, от 2 до 2,5 м – рекомендуем 3 лаги.
                </Popover>
              </div>
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Калитка</h4>
              <div className="position-relative">
                <Select
                  className={classNames(s.select, s.grow)}
                  options={[
                    {value: 5000, label: '1 калитка'},
                    {value: 10000, label: '2 калитки'},
                    {value: 0, label: 'нет калиток'},
                  ]}
                  placeholder={'Количество калиток'}
                  onChange={e => setTotal({...total, gate: e.label, gatePrice: e.value})}
                />
                <Popover className={s.buttonTip}>
                    Стандартная ширина калитки 90 см. Возможно её изготовление по индивидуальным параметрам. Калитка идёт с замком и комплектом ключей
                </Popover>
              </div>
            </div>

            <div className={classNames(s.inputControl, s.fullRow)}>
              <h4 className={s.title}>Параметры ворот</h4>
              <Select
                className={classNames(s.select, s.grow)}
                options={gateOptions(state.gateVariations)}
                placeholder={'Вид'}
                onChange={
                  e => {
                    if(!e.value) {
                      setTotal({
                        ...total,
                        gateVariations: e.gateVariations,
                        gateVariationsName: e.value,
                        gateWidth: 0,
                        gateWidthName: 0,

                      });
                      return;
                    }
                    setTotal({...total, gateVariations: e.gateVariations, gateVariationsName: e.value, });
                  }
                }
              />
              <Select
                isDisabled={!total.gateVariations}
                placeholder={'Длина, м'}
                value={{value: total.gateWidth, label: total.gateWidthName }}
                className={classNames(s.select)}
                options={widthGateOptions(total.gateVariations)}
                onChange={e => setTotal({...total, gateWidth: e.obj, gateWidthName: e.label})}
              />
            </div>
            {
              console.log(total.gateWidth)
            }

            <div className={s.inputControl}>
              <div className='position-relative'>
                <h4 className={s.title}>Грунтовка каркаса</h4>
                <Popover className={classNames(s.buttonTip, s.buttonTipWithTitle)}>
                  Для долговечности забора и исключения ржавых подтеков, рекомендуем в обязательном порядке грунтовать
                  каркас.
                </Popover>
              </div>
              <SelectRadio
                isTrue={state.primer}
                onChange={e => setTotal({...total, primer: e})}
                name="primer"
              />
            </div>

            <div className={s.inputControl}>
              <h4 className={s.title}>Наличие фундамента</h4>
              <SelectRadio
                isTrue={state.foundation}
                onChange={e => setTotal({...total, foundation: e})}
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
