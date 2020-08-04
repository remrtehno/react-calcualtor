import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 100,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 20,
    width: 20,
  },
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: data.color,
      // isDisabled
      //   ? null
      //   : isSelected
      //     ? data.color
      //     : isFocused
      //       ? color.alpha(0.1).css()
      //       : null,


      color:  chroma.contrast(color, 'white') > 2
        ? 'white'
        : 'black',

        // isDisabled
        // ? '#ccc'
        // : isSelected
        //   ? chroma.contrast(color, 'white') > 2
        //     ? 'white'
        //     : 'black'
        //   : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const ColoredSelect = ({options = [], placeholder, className, onChange}) => (
  <Select
   // menuIsOpen={true}
    placeholder={placeholder}
    defaultValue={options[0]}
    onChange={onChange}
    className={className}
    options={options}
    styles={colourStyles}
  />
);

export default ColoredSelect;
