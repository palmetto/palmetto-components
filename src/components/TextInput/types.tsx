export default interface availableMasksTypes {
  phone: {
    numericOnly: boolean;
    blocks: number[];
    delimiters: string[];
  };
  creditCard: {
    creditCard: boolean;
  };
}
