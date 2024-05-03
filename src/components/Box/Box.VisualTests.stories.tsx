/* eslint-disable react/no-array-index-key */
/* eslint-disable no-else-return */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Box, BoxProps } from './Box';
import {
  FONT_SIZE_OPTIONS,
  FONT_COLOR_OPTIONS,
  BRAND_COLOR_NAMES,
  SPACING_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  BACKGROUND_COLOR_OPTIONS,
} from '../../lib/tokens';
import { BrandColor, BackgroundColor } from '../../types';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { ResponsiveProvider } from '../ResponsiveProvider/ResponsiveProvider';
import { useBreakpoint } from '../../hooks/useBreakpoint/useBreakpoint';

export default {
  title: 'Components/Box/Visual Regression Tests',
  component: Box,
} as Meta;

export const AllBackgroundColors: React.FunctionComponent<BoxProps> = () => (
  <Box direction="column" fontSize="sm">
    {BACKGROUND_COLOR_OPTIONS.map((color: BackgroundColor, index: number) => (
      <Box padding="xs" background={color} key={`${color}-${index}`}>
        {color}
      </Box>
    ))}
  </Box>
);

export const AllBorderColors: React.FunctionComponent<BoxProps> = () => (
  <Box flex="auto" direction="row" fontSize="sm">
    {BRAND_COLOR_NAMES.map((color, index) => {
      if (color.includes('inherit')) return null;
      else if (
        color === 'dark'
        || color === 'light'
        || color === 'black'
        || color === 'white'
        || color === 'transparent'
      ) {
        return (
          <Box
            borderColor={color}
            borderWidth="sm"
            padding="xs"
            key={`${color}-${index}`}
          >
            {`${color}`}
          </Box>
        );
      } else {
        return (
          <Box flex="auto" key={`${color}-${index}`}>
            <Box
              flex="auto"
              borderColor={`${color}-50` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-50`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-100` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-100`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-200` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-200`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-300` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-300`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-400` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-400`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-500` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-500`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-600` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-600`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-700` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-700`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-800` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-800`}
            </Box>
            <Box
              flex="auto"
              borderColor={`${color}-900` as BrandColor}
              borderWidth="sm"
              padding="xs"
            >
              {`${color}-900`}
            </Box>
          </Box>
        );
      }
    })}
  </Box>
);

export const AllGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" gap="lg">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box gap={spacing} direction="row" key={i}>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllRowGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" gap="lg" direction="row">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box rowGap={spacing} direction="column" key={i}>
        <Box width="100" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="100" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="100" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="100" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="100" background="primary-100" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllColumnGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" gap="lg">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box columnGap={spacing} direction="row" key={i}>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllRowChildGap: React.FunctionComponent<BoxProps> = () => (
  <Box maxWidth="5xl" display="block" childGap="xs">
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box childGap={spacing} direction="row" key={i}>
        <Box width="20%" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box width="20%" background="primary-100" padding="sm">
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
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
        <Box background="primary-100" padding="sm">
          {spacing}
        </Box>
      </Box>
    ))}
  </Box>
);

export const AllFontColors: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...FONT_COLOR_OPTIONS].map((color, i) => (
      <Box color={color} key={i}>
        {`${color}`}
      </Box>
    ))}
  </>
);

export const AllFontSizesWeightsFamily: React.FunctionComponent<BoxProps> = () => (
  <Box gap="3xl">
    {[...FONT_FAMILY_OPTIONS].map((fontFamily, l) => (
      <Box gap="xl" key={l}>
        {[...FONT_WEIGHT_OPTIONS].map((fontWeight, j) => (
          <Box key={j}>
            {[...FONT_SIZE_OPTIONS].reverse().map((fontSize, i) => (
              <Box
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                key={i}
              >
                {`${fontWeight} ${fontSize} font size`}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);

export const AllMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={spacing} background="primary-50" key={i}>
        {`${spacing} margin`}
      </Box>
    ))}
  </>
);

export const AllHorizontalMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={`0 ${spacing}`} background="primary-50" key={i}>
        {`${spacing} horizontal margin`}
      </Box>
    ))}
  </>
);

export const AllVerticalMargin: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box margin={`${spacing} 0`} background="primary-50" key={i}>
        {`${spacing} vertical margin`}
      </Box>
    ))}
  </>
);

export const AllPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box padding={spacing} background="primary-50" margin="xs 0" key={i}>
        {`${spacing} padding`}
      </Box>
    ))}
  </>
);

export const AllHorizontalPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box
        padding={`0 ${spacing}`}
        background="primary-50"
        margin="xs 0"
        key={i}
      >
        {`${spacing} horizontal padding`}
      </Box>
    ))}
  </>
);

export const AllVerticalPadding: React.FunctionComponent<BoxProps> = () => (
  <>
    {[...SPACING_OPTIONS].map((spacing, i) => (
      <Box
        padding={`${spacing} 0`}
        background="primary-50"
        margin="xs 0"
        key={i}
      >
        {`${spacing} vertical padding`}
      </Box>
    ))}
  </>
);

const BoxTemplate: Story<BoxProps> = ({ propertyName, ...args }) => {
  const Component = () => {
    const { activeBreakpoint } = useBreakpoint();
    return (
      <Box padding="lg" background="grey-50">
        <Box {...args}>
          <p>{`Breakpoint: ${activeBreakpoint.name}`}</p>
          <p>
            {`${propertyName}: ${args[propertyName][activeBreakpoint.name]}`}
          </p>
        </Box>
      </Box>
    );
  };
  return (
    <ResponsiveProvider>
      <Component />
    </ResponsiveProvider>
  );
};

export const ResponsiveFontSize = BoxTemplate.bind({});
ResponsiveFontSize.args = {
  propertyName: 'fontSize',
  fontSize: {
    base: 'md',
    tablet: 'lg',
    desktop: 'xl',
    hd: '4xl',
  },
  padding: 'sm',
};
ResponsiveFontSize.parameters = RESPONSIVE_STORY;

export const ResponsiveRadius = BoxTemplate.bind({});
ResponsiveRadius.args = {
  propertyName: 'radius',
  radius: {
    base: 'circle',
    tablet: 'sm sm 0 0',
    desktop: '0 0 md md',
    hd: 'lg',
  },
  background: 'info-100',
  padding: 'sm',
};
ResponsiveRadius.parameters = RESPONSIVE_STORY;

export const ResponsiveShadow = BoxTemplate.bind({});
ResponsiveShadow.args = {
  propertyName: 'shadow',
  shadow: {
    base: '0',
    tablet: 'lg',
    desktop: 'xl',
    hd: '2xl',
  },
  padding: 'sm',
  background: 'white',
};
ResponsiveShadow.parameters = RESPONSIVE_STORY;

export const ResponsiveTextAlign = BoxTemplate.bind({});
ResponsiveTextAlign.args = {
  propertyName: 'textAlign',
  textAlign: {
    base: 'right',
    tablet: 'left',
    desktop: 'center',
  },
  padding: 'sm',
  background: 'info-100',
};
ResponsiveTextAlign.parameters = RESPONSIVE_STORY;

export const ResponsiveBorderWidth = BoxTemplate.bind({});
ResponsiveBorderWidth.args = {
  propertyName: 'borderWidth',
  borderWidth: {
    base: 'sm',
    tablet: 'xs',
    desktop: 'sm xs 0 sm',
    hd: '0 0 sm sm',
  },
  borderColor: 'secondary-500',
  padding: 'sm',
};
ResponsiveBorderWidth.parameters = RESPONSIVE_STORY;

export const ResponsiveWidth = BoxTemplate.bind({});
ResponsiveWidth.args = {
  propertyName: 'width',
  width: {
    base: '2xl',
    tablet: '60',
    desktop: '5xl',
    hd: '100',
  },
  height: '3xl',
  background: 'info-100',
  padding: 'sm',
};
ResponsiveWidth.parameters = RESPONSIVE_STORY;

export const ResponsiveMaxWidth = BoxTemplate.bind({});
ResponsiveMaxWidth.args = {
  propertyName: 'maxWidth',
  maxWidth: {
    base: '2xl',
    tablet: '50',
    desktop: '3xl',
    hd: '100',
  },
  height: '3xl',
  background: 'info-100',
  padding: 'sm',
  display: 'block',
};
ResponsiveMaxWidth.parameters = RESPONSIVE_STORY;

export const ResponsiveMinWidth = BoxTemplate.bind({});
ResponsiveMinWidth.args = {
  propertyName: 'minWidth',
  minWidth: {
    base: '2xl',
    tablet: '50',
    desktop: '3xl',
    hd: '100',
  },
  height: '3xl',
  background: 'info-100',
  padding: 'sm',
  display: 'inline-block',
  alignSelf: 'flex-start',
};
ResponsiveMinWidth.parameters = RESPONSIVE_STORY;

export const ResponsiveHeight = BoxTemplate.bind({});
ResponsiveHeight.args = {
  propertyName: 'height',
  height: {
    base: 'md',
    tablet: 'lg',
    desktop: 'xl',
    hd: '2xl',
  },
  width: '3xl',
  background: 'info-100',
  padding: 'sm',
};
ResponsiveHeight.parameters = RESPONSIVE_STORY;

export const ResponsiveMaxHeight = BoxTemplate.bind({});
ResponsiveMaxHeight.args = {
  propertyName: 'maxHeight',
  maxHeight: {
    base: 'sm',
    tablet: 'lg',
    desktop: '2xl',
    hd: '4xl',
  },
  height: '5xl',
  width: '3xl',
  background: 'info-100',
  padding: 'sm',
};
ResponsiveMaxHeight.parameters = RESPONSIVE_STORY;

export const ResponsiveMinHeight = BoxTemplate.bind({});
ResponsiveMinHeight.args = {
  propertyName: 'minHeight',
  minHeight: {
    base: 'sm',
    tablet: 'lg',
    desktop: '2xl',
    hd: '4xl',
  },
  width: '3xl',
  background: 'info-100',
  padding: 'sm',
  alignSelf: 'flex-start',
};
ResponsiveMinHeight.parameters = RESPONSIVE_STORY;

export const ResponsiveMargin = BoxTemplate.bind({});
ResponsiveMargin.args = {
  propertyName: 'margin',
  margin: {
    base: 'md',
    tablet: '2xl lg',
    desktop: '5xl 3xl sm',
    hd: '3xl 0 2xl lg',
  },
  width: '3xl',
  background: 'info-100',
};
ResponsiveMargin.parameters = RESPONSIVE_STORY;

export const ResponsivePadding = BoxTemplate.bind({});
ResponsivePadding.args = {
  propertyName: 'padding',
  padding: {
    base: '0',
    tablet: '2xl lg',
    desktop: '5xl 3xl 4xl',
    hd: '3xl 0 2xl lg',
  },
  width: '3xl',
  background: 'info-100',
};
ResponsivePadding.parameters = RESPONSIVE_STORY;

const BoxChildrenTemplate: Story<BoxProps> = ({ propertyName, ...args }) => {
  const Template: React.FC<Record<string, unknown>> = () => {
    const { activeBreakpoint } = useBreakpoint();
    return (
      <Box background="grey-50" padding="lg" {...args}>
        <Box
          flex="auto"
          radius="md"
          background="info-100"
          height="lg"
          justifyContent="center"
          alignItems="center"
        >
          <p>{`Breakpoint: ${activeBreakpoint.name}`}</p>
          <p>
            {`${propertyName}: ${args[propertyName][activeBreakpoint.name]}`}
          </p>
        </Box>
        <Box
          flex="auto"
          radius="md"
          background="info-100"
          height="lg"
          justifyContent="center"
          alignItems="center"
        >
          <p>{`Breakpoint: ${activeBreakpoint.name}`}</p>
          <p>
            {`${propertyName}: ${args[propertyName][activeBreakpoint.name]}`}
          </p>
        </Box>
        <Box
          flex="auto"
          radius="md"
          background="info-100"
          height="lg"
          justifyContent="center"
          alignItems="center"
        >
          <p>{`Breakpoint: ${activeBreakpoint.name}`}</p>
          <p>
            {`${propertyName}: ${args[propertyName][activeBreakpoint.name]}`}
          </p>
        </Box>
      </Box>
    );
  };

  return (
    <ResponsiveProvider>
      <Template />
    </ResponsiveProvider>
  );
};

export const ResponsiveDirection = BoxChildrenTemplate.bind({});
ResponsiveDirection.args = {
  propertyName: 'direction',
  direction: {
    base: 'column',
    tablet: 'row',
    desktop: 'column-reverse',
    hd: 'row-reverse',
  },
};
ResponsiveDirection.parameters = RESPONSIVE_STORY;

export const ResponsiveChildGap = BoxChildrenTemplate.bind({});
ResponsiveChildGap.args = {
  propertyName: 'childGap',
  childGap: {
    base: 'xs',
    tablet: 'lg',
    desktop: '3xl',
    hd: '5xl',
  },
};
ResponsiveChildGap.parameters = RESPONSIVE_STORY;

export const ResponsiveGap = BoxChildrenTemplate.bind({});
ResponsiveGap.args = {
  propertyName: 'gap',
  gap: {
    base: 'xs',
    tablet: 'lg',
    desktop: '3xl',
    hd: '5xl',
  },
};
ResponsiveGap.parameters = RESPONSIVE_STORY;

export const ResponsiveRowGap = BoxChildrenTemplate.bind({});
ResponsiveRowGap.args = {
  propertyName: 'rowGap',
  rowGap: {
    base: 'xs',
    tablet: 'lg',
    desktop: '3xl',
    hd: '5xl',
  },
};
ResponsiveRowGap.parameters = RESPONSIVE_STORY;

export const ResponsiveColumnGap = BoxChildrenTemplate.bind({});
ResponsiveColumnGap.args = {
  propertyName: 'columnGap',
  columnGap: {
    base: 'xs',
    tablet: 'lg',
    desktop: '3xl',
    hd: '5xl',
  },
  direction: 'row',
};
ResponsiveColumnGap.parameters = RESPONSIVE_STORY;

export const AllCursorOptions: React.FunctionComponent<BoxProps> = () => (
  <Box
    padding="md"
    childGap="md"
    flex="auto"
    background="primary-50"
    overflow="auto"
  >
    <Box cursor="auto" padding="md" background="primary-100">
      auto
    </Box>
    <Box cursor="default" padding="md" background="primary-100">
      default
    </Box>
    <Box cursor="none" padding="md" background="primary-100">
      none
    </Box>
    <Box cursor="context-menu" padding="md" background="primary-100">
      context-menu
    </Box>
    <Box cursor="help" padding="md" background="primary-100">
      help
    </Box>
    <Box cursor="pointer" padding="md" background="primary-100">
      pointer
    </Box>
    <Box cursor="progress" padding="md" background="primary-100">
      progress
    </Box>
    <Box cursor="wait" padding="md" background="primary-100">
      wait
    </Box>
    <Box cursor="cell" padding="md" background="primary-100">
      cell
    </Box>
    <Box cursor="crosshair" padding="md" background="primary-100">
      crosshair
    </Box>
    <Box cursor="text" padding="md" background="primary-100">
      text
    </Box>
    <Box cursor="vertical-text" padding="md" background="primary-100">
      vertical-text
    </Box>
    <Box cursor="alias" padding="md" background="primary-100">
      alias
    </Box>
    <Box cursor="copy" padding="md" background="primary-100">
      copy
    </Box>
    <Box cursor="move" padding="md" background="primary-100">
      move
    </Box>
    <Box cursor="no-drop" padding="md" background="primary-100">
      no-drop
    </Box>
    <Box cursor="not-allowed" padding="md" background="primary-100">
      not-allowed
    </Box>
    <Box cursor="grab" padding="md" background="primary-100">
      grab
    </Box>
    <Box cursor="grabbing" padding="md" background="primary-100">
      grabbing
    </Box>
    <Box cursor="all-scroll" padding="md" background="primary-100">
      all-scroll
    </Box>
    <Box cursor="col-resize" padding="md" background="primary-100">
      col-resize
    </Box>
    <Box cursor="row-resize" padding="md" background="primary-100">
      row-resize
    </Box>
    <Box cursor="n-resize" padding="md" background="primary-100">
      n-resize
    </Box>
    <Box cursor="e-resize" padding="md" background="primary-100">
      e-resize
    </Box>
    <Box cursor="s-resize" padding="md" background="primary-100">
      s-resize
    </Box>
    <Box cursor="w-resize" padding="md" background="primary-100">
      w-resize
    </Box>
    <Box cursor="ne-resize" padding="md" background="primary-100">
      ne-resize
    </Box>
    <Box cursor="nw-resize" padding="md" background="primary-100">
      nw-resize
    </Box>
    <Box cursor="se-resize" padding="md" background="primary-100">
      se-resize
    </Box>
    <Box cursor="sw-resize" padding="md" background="primary-100">
      sw-resize
    </Box>
    <Box cursor="ew-resize" padding="md" background="primary-100">
      ew-resize
    </Box>
    <Box cursor="ns-resize" padding="md" background="primary-100">
      ns-resize
    </Box>
    <Box cursor="nesw-resize" padding="md" background="primary-100">
      nesw-resize
    </Box>
    <Box cursor="nwse-resize" padding="md" background="primary-100">
      nwse-resize
    </Box>
    <Box cursor="zoom-in" padding="md" background="primary-100">
      zoom-in
    </Box>
    <Box cursor="zoom-out" padding="md" background="primary-100">
      zoom-out
    </Box>
  </Box>
);

export const AllPositionOptions: React.FunctionComponent<BoxProps> = () => (
  <Box
    padding="md"
    childGap="md"
    flex="auto"
    background="primary-50"
    overflow="auto"
  >
    <Box position="absolute" padding="md" background="primary-100">
      absolute
    </Box>
    <Box position="relative" padding="md" background="primary-100">
      relative
    </Box>
    <Box position="sticky" padding="md" background="primary-100">
      sticky
    </Box>
    <Box position="fixed" padding="md" background="primary-100">
      fixed
    </Box>
    <Box position="static" padding="md" background="primary-100">
      static
    </Box>
    <Box position="unset" padding="md" background="primary-100">
      unset
    </Box>
    <Box position="initial" padding="md" background="primary-100">
      initial
    </Box>
    <Box position="inherit" padding="md" background="primary-100">
      inherit
    </Box>
    <Box position="revert" padding="md" background="primary-100">
      revert
    </Box>
  </Box>
);

export const ResponsivePosition = BoxChildrenTemplate.bind({});
ResponsivePosition.args = {
  propertyName: 'position',
  position: {
    base: 'sticky',
    tablet: 'static',
    desktop: 'absolute',
    hd: 'relative',
  },
};
ResponsivePosition.parameters = RESPONSIVE_STORY;
