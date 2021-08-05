import { ValueOrFunction, ValueFunction } from '../types';

export const isFunction = <TValue, TArg>( // eslint-disable-line import/prefer-default-export
  valOrFunction: ValueOrFunction<TValue, TArg>,
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';
