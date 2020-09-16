// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownPropertiesObjType = { [key: string]: any; };

export interface CssStylesAndClasses {
  styles?: {
    [key: string]: string;
  };
  classes?: string[];
}

export type CssDimension =
  'h' |
  'w';

export type CssSpacing =
  'm' |
  'p';
