import { generateResponsiveClasses } from './generateResponsiveClasses';

describe('generateResponsiveClasses', () => {
  test('it generates a base class when passed a single string value', () => {
    const generatedClass = generateResponsiveClasses('align-items', 'flex-start');

    expect(generatedClass).toEqual(['align-items-flex-start']);
  });

  test('it generates responsive classes when an keyed object is passed', () => {
    const generatedClass = generateResponsiveClasses('align-items', { tablet: 'flex-start', hd: 'flex-end' });

    expect(generatedClass).toEqual(['align-items-flex-start-tablet', 'align-items-flex-end-hd']);
  });
});
