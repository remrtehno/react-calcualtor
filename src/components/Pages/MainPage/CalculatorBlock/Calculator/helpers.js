export const calcSheetArea = ([fenceWidth, fenceHeight]) => {
  const compensive = Number(fenceWidth)/1.2*0.05*1.9;
  const sheetArea = (Number(fenceWidth) * Number(fenceHeight) + compensive);
  return sheetArea;
};

export const calcMultiple = (array = []) => {
  let result = 1;

  array.forEach( value => {
    if(value * 1) {
      result *= +value;
    }
  });

  return result;

  //return array.reduce( (acc, val) => Number(acc) * Number(val || 1) );
};

export const calcPillar = ({gate, gateVariationsName, fenceWidth}) => {

  let pillars = 0;
  if(gate && gateVariationsName) {
    pillars += 2;
  }
  if(gate && !gateVariationsName) {
    pillars += 2;
  }
  if(!gate && !gateVariationsName) {
    //gate = 0 gate=0 ==== + 1
    pillars += 1;
  }
  if(!gate && gateVariationsName) {
    // 0 any === 0
    pillars += 1;
  }

  return [Number(fenceWidth)/3+pillars, pillars];

};

export const calcResult = (array = []) => {

  let result = 0;

  array.forEach( value => {
    if(Number.isFinite(+value)) {
      result += +value;
    }
  });

  return Math.round(result);

  //return array.reduce( (acc, val) => Number(acc || 0) + Number(val || 0) ).toFixed();
};


export function contourLinesRowsOptions(data = []) {
  return data.map( val => {
   return { value: val.label, label: val.label };
  })
}