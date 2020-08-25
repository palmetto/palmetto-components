export interface availableMasksTypes {
  phone: {
    numericOnly: boolean;
    blocks: number[];
    delimiters: string[];
  };
  creditCard: {
    creditCard: boolean;
  };
}

export type Types = 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
