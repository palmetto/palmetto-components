// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownPropertiesObjType = { [key: string]: any; };

export interface CssObject {
  styles?: {
    [key: string]: string;
  };
  classes?: string[];
}
