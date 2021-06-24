export const phone = {
  numericOnly: true,
  blocks: [0, 3, 0, 3, 4],
  delimiters: ['(', ')', ' ', '-'],
};

export const creditCard = {
  creditCard: true,
};

export const date = {
  date: true,
  delimiter: '-',
  datePattern: ['m', 'd', 'Y'],
};
