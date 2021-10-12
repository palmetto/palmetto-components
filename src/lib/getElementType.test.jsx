import { getElementType } from './getElementType';

const MockComponent = () => ({
  defaultProps: {
    as: 'h4',
  },
});

const getDefault = () => 'p';

describe('Get Element Type', () => {
  test('function returns element type if provided by props', () => {
    const elementType = getElementType(MockComponent(), { as: 'h1' });

    expect(elementType).toBe('h1');
  });

  test('function returns default element type if provided by defaultProps', () => {
    const elementType = getElementType(MockComponent(), {});

    expect(elementType).toBe('h4');
  });

  test('function returns default element based on getDefault function if provided', () => {
    const elementType = getElementType(MockComponent(), {}, getDefault);

    expect(elementType).toBe('p');
  });

  test('function returns an anchor element if href is included in props', () => {
    const elementType = getElementType(MockComponent(), { href: 'myurl' });

    expect(elementType).toBe('a');
  });

  test('function returns a div if no defaultProps or props are provided', () => {
    const elementType = getElementType({}, {}, () => null);

    expect(elementType).toBe('div');
  });
});
