import { InputMaskType } from './TextInput';

export type PhoneMask = {
  numericOnly: boolean;
  blocks: number[];
  delimiters: string[];
};

export type CreditCardMask = {
  creditCard: boolean;
};

export type DateMask = {
  date: boolean;
  delimiter: string;
  datePattern: string[];
};

export const phoneMask: PhoneMask = {
  numericOnly: true,
  blocks: [0, 3, 0, 3, 4],
  delimiters: ['(', ')', ' ', '-'],
};

export const creditCardMask: CreditCardMask = {
  creditCard: true,
};

export const dateMask: DateMask = {
  date: true,
  delimiter: '-',
  datePattern: ['m', 'd', 'Y'],
};

const availableInputMaskTypes = {
  phone: phoneMask,
  creditCard: creditCardMask,
  date: dateMask,
};

export const getInputMaskType = (
  mask: InputMaskType,
) => {
  if (typeof mask === 'string') {
    return availableInputMaskTypes[mask];
  }

  return mask;
};

