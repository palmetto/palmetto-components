import React from 'react';
import { render } from '@testing-library/react';
import { Duration } from './Duration';

describe('Duration', () => {
  test('combines all the times', () => {
    const { getByText } = render(
      <Duration milliseconds={1} seconds={2} minutes={3} displaySecondsUntilInMs={200000} />,
    );
    // 182,001 ms (1 milliseconds + 2 seconds + 3 minutes) rounded up to minutes
    expect(getByText('183 seconds')).toBeDefined();
  });

  test('uses seconds up to displaySecondsUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={10000} displaySecondsUntilInMs={10001} />,
    );
    expect(getByText('10 seconds')).toBeDefined();
  });

  test('uses minutes after displaySecondsUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={10000} displaySecondsUntilInMs={9999} />,
    );
    expect(getByText('1 minute')).toBeDefined();
  });

  test('uses seconds up to displayMinutesUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={7000000} displayMinutesUntilInMs={7000001} />,
    );
    expect(getByText('117 minutes')).toBeDefined();
  });

  test('uses minutes after displayMinutesUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={7000002} displayMinutesUntilInMs={7000001} />,
    );
    expect(getByText('2 hours')).toBeDefined();
  });

  test('uses seconds up to displayHoursUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={86000000} displayHoursUntilInMs={86000001} />,
    );
    expect(getByText('24 hours')).toBeDefined();
  });

  test('uses minutes after displayHoursUntilInMs cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={86000002} displayHoursUntilInMs={86000001} />,
    );
    expect(getByText('1 day')).toBeDefined();
  });

  test('can be configured to round down', () => {
    const { getByText } = render(
      <Duration milliseconds={60001} roundUp={false} />,
    );
    expect(getByText('1 minute')).toBeDefined();
  });
});
