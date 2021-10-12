import { getAutoCompleteValue } from './getAutoCompleteValue';

describe('getAutoCompleteValue', () => {
  test('it returns expected value when passed on', () => {
    const value = getAutoCompleteValue('on');

    expect(value).toEqual('on');
  });

  test('it returns expected value when passed off', () => {
    const value = getAutoCompleteValue('off');

    expect(value).toEqual('off');
  });

  test('it returns expected value when passed true', () => {
    const value = getAutoCompleteValue(true);

    expect(value).toEqual('on');
  });

  test('it returns expected value when passed false', () => {
    const value = getAutoCompleteValue(false);

    expect(value).toEqual('off');
  });
});
