export type HEADING_LEVELS_TYPE = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const HEADING_LEVELS: HEADING_LEVELS_TYPE[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]; // eslint-disable-line import/prefer-default-export

export const HEADING_DEFAULT_SIZE_MAP = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
};
