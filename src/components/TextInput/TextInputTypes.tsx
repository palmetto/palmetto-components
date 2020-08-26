export type MasksType = {
  phone: {
    numericOnly: boolean;
    blocks: number[];
    delimiters: string[];
  };
  creditCard: {
    creditCard: boolean;
  };
}

export type InputType = 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
