/* eslint-disable no-else-return */
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Box, { BoxProps } from './Box';
import {
  FONT_SIZE_OPTIONS,
  FONT_COLOR_OPTIONS,
  BRAND_COLOR_NAMES,
  SPACING_OPTIONS,
} from '../../lib/tokens';

export default {
  title: 'Components/Box/Visual Regression Tests',
  component: Box,
} as Meta;

export const AllBackgroundColors: React.FunctionComponent<BoxProps> = () => (
  <Box flex="auto" direction="row" fontSize="sm">
    {BRAND_COLOR_NAMES.map((color, index) => {
      if (color.includes('inherit')) return null;
      else if (color === 'dark' || color === 'light' || color === 'black' || color === 'white') {
        return (
          <Box flex="auto" padding="xs" background={color} key={`${color}-${index}`}>
            {`${color}`}
          </Box>
        );
      } else {
        return (
          <Box flex="auto" key={`${color}-${index}`}>
            <Box flex="auto" padding="xs" background="{`${color}-50`}">
              {`${color}-50`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-100`}>
              {`${color}-100`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-200`}>
              {`${color}-200`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-300`}>
              {`${color}-300`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-400`}>
              {`${color}-400`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-500`}>
              {`${color}-500`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-600`}>
              {`${color}-600`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-700`}>
              {`${color}-700`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-800`}>
              {`${color}-800`}
            </Box>
            <Box flex="auto" padding="xs" background={`${color}-900`}>
              {`${color}-900`}
            </Box>
          </Box>
        );
      }
    })}
  </Box>
);

export const AllBorderColors: React.FunctionComponent<BoxProps> = () => (
  <Box flex="auto" direction="row" fontSize="sm">
    {BRAND_COLOR_NAMES.map((color, index) => {
      if (color.includes('inherit')) return null;
      else if (color === 'dark' || color === 'light' || color === 'black' || color === 'white') {
        return (
          <Box borderColor={color} borderWidth="sm" padding="xs" key={`${color}-${index}`}>
            {`${color}`}
          </Box>
        );
      } else {
        return (
          <Box flex="auto" key={`${color}-${index}`}>
            <Box flex="auto" borderColor={`${color}-50`} borderWidth="sm" padding="xs">
              {`${color}-50`}
            </Box>
            <Box flex="auto" borderColor={`${color}-100`} borderWidth="sm" padding="xs">
              {`${color}-100`}
            </Box>
            <Box flex="auto" borderColor={`${color}-200`} borderWidth="sm" padding="xs">
              {`${color}-200`}
            </Box>
            <Box flex="auto" borderColor={`${color}-300`} borderWidth="sm" padding="xs">
              {`${color}-300`}
            </Box>
            <Box flex="auto" borderColor={`${color}-400`} borderWidth="sm" padding="xs">
              {`${color}-400`}
            </Box>
            <Box flex="auto" borderColor={`${color}-500`} borderWidth="sm" padding="xs">
              {`${color}-500`}
            </Box>
            <Box flex="auto" borderColor={`${color}-600`} borderWidth="sm" padding="xs">
              {`${color}-600`}
            </Box>
            <Box flex="auto" borderColor={`${color}-700`} borderWidth="sm" padding="xs">
              {`${color}-700`}
            </Box>
            <Box flex="auto" borderColor={`${color}-800`} borderWidth="sm" padding="xs">
              {`${color}-800`}
            </Box>
            <Box flex="auto" borderColor={`${color}-900`} borderWidth="sm" padding="xs">
              {`${color}-900`}
            </Box>
          </Box>
        );
      }
    })}
  </Box>
);

export const AllRowChildGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" display="block" childGap="xs">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box childGap={spacing} direction="row" key={i}>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-light" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllColumnChildGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" childGap="xs" direction="row">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box flex="auto" childGap={spacing} direction="column" key={i}>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-light" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllFontColors: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...FONT_COLOR_OPTIONS].map((color, i) => (
      <Box color={color} background={color === 'inverse' ? 'grey-darker' : null} key={i}>
        {`${color}`}
      </Box>
    ))}
  </>
);

export const AllFontSizes: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...FONT_SIZE_OPTIONS].reverse().map((fontSize, i) => (
      <Box fontSize={fontSize} key={i}>
        {`${fontSize} font size`}
      </Box>
    ))}
  </>
);
