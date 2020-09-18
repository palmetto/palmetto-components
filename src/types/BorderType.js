import {
  PropTypes,
} from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.oneOf([
    'none',
    'top',
    'left',
    'bottom',
    'right',
    'horizontal',
    'vertical',
    'all',
  ]),
  PropTypes.shape({
    width: PropTypes.string,
    style: PropTypes.oneOf([
      'solid',
      'dashed',
      'dotted',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
      'hidden',
    ]),
    side: PropTypes.oneOf([
      'top',
      'left',
      'bottom',
      'right',
      'horizontal',
      'vertical',
      'all',
      'none',
    ]),
    // color: colorType, need to generate colorType based on design tokens
  }),
]);
