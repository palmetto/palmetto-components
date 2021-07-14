import { ValueOrFunction } from '../types';
import { isFunction } from './isFunction';

export const resolveValue = <TValue, TArg>( // eslint-disable-line import/prefer-default-export
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg,
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);
