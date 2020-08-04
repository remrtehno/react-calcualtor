export const calcSheetArea = ([fenceWidth, fenceHeight]) => {
  const compensive = Number(fenceWidth)/1.2*0.05*1.9;
  const sheetArea = (Number(fenceWidth) * Number(fenceHeight) + compensive);
  return sheetArea;
};

export const calcMultiple = (array = [0]) => {
  return array.reduce( (acc, val) => Number(acc) * Number(val || 1) );
};

export const calcPillar = ({gate, gateVariationsName, fenceWidth}) => {
  console.log(gate, gateVariationsName, fenceWidth);

  let pillars = 0;
  if(gate && gateVariationsName) {
    pillars += 1;
  }
  if(gate && !gateVariationsName) {
    pillars += 2;
  }
  if(!gate && !gateVariationsName) {
    pillars += 2;
  }
  if(!gate && gateVariationsName) {
    pillars += 2;
  }

  return [Number(fenceWidth)/2.5+pillars, pillars];

};

export const calcResult = (array = [0]) => {
  console.log(array);
  return array.reduce( (acc, val) => Number(acc || 0) + Number(val || 0) ).toFixed();
};
