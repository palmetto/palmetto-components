export interface AvailableMaskTypes {
  phone: {
    numericOnly: boolean;
    blocks: number[];
    delimiters: string[];
  };
  creditCard: {
    creditCard: boolean;
  };
}

export type InputTypes = 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
