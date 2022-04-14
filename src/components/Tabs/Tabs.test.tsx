import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  describe('Default', () => {
    test('It renders basic tabs structure by default', () => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
      render(
        <Tabs value={0} onChange={() => null}>
          <Tabs.Item>
            tab 1
          </Tabs.Item>
        </Tabs>,
      );

      const navElement = screen.getByRole('navigation');
      const tabListElement = screen.getByRole('tablist');
      const tab = screen.getByText('tab 1').closest('button');

      expect(navElement).toBeInTheDocument();
      expect(tabListElement).toBeInTheDocument();
      expect(tab).toBeInTheDocument();
      expect(tab).toHaveAttribute('role', 'tab');
    });
  });

  describe('Active tab', () => {
    test('It renders tabs in active state based on the value', () => {
      const { rerender } = render(
        <Tabs value={0} onChange={() => null}>
          <Tabs.Item>
            tab 1
          </Tabs.Item>
          <Tabs.Item>
            tab 2
          </Tabs.Item>
        </Tabs>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      const tabTwo = screen.getByText('tab 2').closest('button');

      expect(tabOne).toHaveClass('tab-item--selected');
      expect(tabTwo).not.toHaveClass('tab-item--selected');

      rerender(
        <Tabs value={1} onChange={() => null}>
          <Tabs.Item>
            tab 3
          </Tabs.Item>
          <Tabs.Item>
            tab 4
          </Tabs.Item>
        </Tabs>,
      );

      const tabThree = screen.getByText('tab 3').closest('button');
      const tabFour = screen.getByText('tab 4').closest('button');

      expect(tabThree).not.toHaveClass('tab-item--selected');
      expect(tabFour).toHaveClass('tab-item--selected');
    });
  });

  describe('Disabled tab', () => {
    test('It disables a tab when isDisabled is passed to tab item', () => {
      const mockOnChange = jest.fn(() => null);
      render(
        <Tabs value={0} onChange={mockOnChange}>
          <Tabs.Item isDisabled>
            tab 1
          </Tabs.Item>
        </Tabs>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      expect(tabOne).toHaveAttribute('disabled', '');
    });
  });

  describe('Event handlers', () => {
    test('It fires an onChange function when a TabItem is clicked', () => {
      const mockedOnChange = jest.fn(() => null);

      render(
        <Tabs value={0} onChange={mockedOnChange}>
          <Tabs.Item>
            tab 1
          </Tabs.Item>
          <Tabs.Item>
            tab 2
          </Tabs.Item>
        </Tabs>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      if (tabOne) fireEvent.click(tabOne);

      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line
      // @ts-ignore
      expect(mockedOnChange.mock.calls[0][1]).toBe(0);
    });

    test('It individual onClick handlers on TabItems in addition to onChange', () => {
      const mockedOnChange = jest.fn(() => null);
      const mockedOnClick = jest.fn(() => null);

      render(
        <Tabs value={0} onChange={mockedOnChange}>
          <Tabs.Item onClick={mockedOnClick}>
            tab 1
          </Tabs.Item>
          <Tabs.Item>
            tab 2
          </Tabs.Item>
        </Tabs>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      if (tabOne) fireEvent.click(tabOne);

      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line
      // @ts-ignore
      expect(mockedOnChange.mock.calls[0][1]).toBe(0);
      expect(mockedOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
