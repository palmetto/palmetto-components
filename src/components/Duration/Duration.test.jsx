import React from 'react';
import { render } from '@testing-library/react';
import { Duration } from './Duration';

describe('Duration', () => {
  test('combines all the times', () => {
    const { getByText } = render(
      <Duration milliseconds={1} seconds={2} minutes={3} displayMinutes={200000} />,
    );
    // 182,001 ms (1 milliseconds + 2 seconds + 3 minutes) rounded up to minutes
    expect(getByText('183 seconds')).toBeDefined();
  });

  test('uses seconds up to displayMinutes cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={10000} displayMinutes={10001} />,
    );
    expect(getByText('10 seconds')).toBeDefined();
  });

  test('uses minutes after displayMinutes cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={10000} displayMinutes={9999} />,
    );
    expect(getByText('1 minute')).toBeDefined();
  });

  test('uses seconds up to displayHours cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={7000000} displayHours={7000001} />,
    );
    expect(getByText('117 minutes')).toBeDefined();
  });

  test('uses minutes after displayHours cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={7000002} displayHours={7000001} />,
    );
    expect(getByText('2 hours')).toBeDefined();
  });

  test('uses seconds up to displayDays cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={86000000} displayDays={86000001} />,
    );
    expect(getByText('24 hours')).toBeDefined();
  });

  test('uses minutes after displayDays cut off', () => {
    const { getByText } = render(
      <Duration milliseconds={86000002} displayDays={86000001} />,
    );
    expect(getByText('1 day')).toBeDefined();
  });

  test('can be configured to round down', () => {
    const { getByText } = render(
      <Duration milliseconds={60001} roundUp={false} />,
    );
    expect(getByText('1 minute')).toBeDefined();
  });

  test('treats 0 as plural', () => {
    const { getByText } = render(
      <Duration milliseconds={0} />,
    );
    expect(getByText('0 seconds')).toBeDefined();
  });

  test('can customize the labels', () => {
    const labels = {
      day: 'trent_day',
      days: 'trent_days',
      hour: 'trent_hour',
      hours: 'trent_hours',
      minute: 'trent_minute',
      minutes: 'trent_minutes',
      second: 'trent_second',
      seconds: 'trent_seconds',
    };
    const { getByText } = render(
      <Duration milliseconds={0} labels={labels} />,
    );
    expect(getByText('0 trent_seconds')).toBeDefined();
  });
});
