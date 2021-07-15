import {
  Key,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';

import {
  OptionTypeBase,
  ValueType,
} from 'react-select';

import {
  BorderRadiusSize as BorderRadius,
  BreakpointSize,
  HeightSize,
  SpacingSize,
  WidthSize,
} from '@palmetto/palmetto-design-tokens/build/types';

export type {
  BorderSize,
  BoxShadowSize,
  BrandColor,
  ColorName,
  FontColor,
  FontSize,
  FontWeight,
  HeightSize,
  LineHeightSize,
  OpacitySize,
  SpacingSize,
  WidthSize,
  ZIndexSize,
  IconName,
  FontFamily,
} from '@palmetto/palmetto-design-tokens/build/types';

export type BreakpointSizeWithBase = BreakpointSize | 'base';

export type Breakpoint = {
  name: BreakpointSizeWithBase;
  minWidth: number; // min width in pixels
}

export type DimensionSize = WidthSize | HeightSize;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownPropertiesObjType = { [key: string]: any; };

export interface FlexProperty {
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  flex?: number | string;
}

export type StylesAndClasses<T> = {
  styles?: T;
  classes?: string[];
}

export type CssDimensionAbbreviation = 'h' | 'w' | 'mw' | 'mh' | 'minw' | 'minh';

export type CssSpacingAbbreviation = 'm' | 'p';

export type CssJustifyContentValue =
  'space-around' |
  'space-between' |
  'center' |
  'flex-end' |
  'space-evenly' |
  'flex-start' |
  'stretch';

export type CssAlignContentValue =
  'flex-start' |
  'flex-end' |
  'center' |
  'stretch' |
  'space-between' |
  'space-around';

export type CssFlexDirectionValue = 'column' | 'column-reverse' | 'row' | 'row-reverse' | undefined;

export type CssAlignItemsValue =
  'flex-start' |
  'flex-end' |
  'center' |
  'baseline' |
  'stretch';

export type CssFlexValue =
  'auto' |
  'initial' |
  'none' |
  'inherit' |
  'unset';

export type CssOverflowValue =
  'visible' |
  'hidden' |
  'clip' |
  'scroll' |
  'auto' |
  'inherit' |
  'initial' |
  'unset';

export type CssDisplayValue =
  'none' |
  'flex' |
  'inline-flex' |
  'block' |
  'inline-block' |
  'inline' |
  'inherit' |
  'grid';

export type CssTextAlignValue =
  'left' |
  'center' |
  'right';

export type BaseSpacing = SpacingSize | string | undefined;
export type BorderRadiusSize = BorderRadius | string | undefined;

export declare type ResponsiveProp<T> = { [breakpoint in BreakpointSizeWithBase]?: T };

export type Row = UnknownPropertiesObjType;

export type Cell = string | number | { [key: string]: unknown; } | unknown[];

export declare type Column = {
  /**
   * Text alignment for column cells (including header alignment). Cells will default to left if not defined.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * CSS Class to be applied uniformly to all individual cells in a column.
   */
  cellClassName?: string;
  /**
   * The key value to be rendered based on the table `rows`.
   */
  dataKey?: string;
  /**
   * Placeholder for empty cells Applies only to the cells of the particular column with this prop.
   */
  emptyCellPlaceholder?: string | number | undefined;
  /**
   * The heading/title text of a column.
   */
  heading?: string;
  /**
   * CSS Class to be applied to the column header cell.
   */
  headerClassName?: string;
  /**
   * A custom key to be used when rendering the column array.
   * Not required as our table auto-generates static, but unique column keys if not passed in.
   */
  key?: Key;
  /**
   * Whether the column data is sortable. Controls whether sorting controls should be displayed.
   */
  isSortable?: boolean;
  /**
   * Render method for column cell data. Provides ability to render any aspect of the cell/row with custom
   * markup.
   */
  render?: (cell?: Cell, row?: Row, rowIndex?: number) => ReactNode;
  /**
   * Whether the column is stuck to the left or right.
   */
  sticky?: 'left' | 'right';
  /**
   * Whether long text should be truncated based on column width. Use in tandem with column width as well as
   * `useFixedWidthColumns` prop in the parent table.
   */
  truncateOverflow?: boolean;
  /**
   * Specific width of the column. Use in tandem with `useFixedWidthColumns` in the parent table.
   */
  width?: number;
}

export type EventWithColumnKey =
  (
    MouseEvent<HTMLTableHeaderCellElement> |
    KeyboardEvent<HTMLTableHeaderCellElement>
  )
  & { sortedKey: Key | undefined; };

export type SimulatedEventPayloadType = {
  target: {
    name: string;
    value: ValueType<OptionTypeBase, boolean>;
  };
};

export type KnownKeys<T> = keyof { [K in keyof T as string extends K ? never : K]: K }

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;
