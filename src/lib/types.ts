// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownPropertiesObjType = { [key: string]: any; };

export interface CssObjectType {
  styles?: {
    [key: string]: string;
  };
  classes?: string[];
}

export type DimensionType =
  'h' |
  'w';

export type SpacingType =
  'm' |
  'p';
