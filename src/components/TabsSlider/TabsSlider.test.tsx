import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabsSlider, tabsSliderSizes, tabsSliderPaddingMap } from './TabsSlider';

// Mocking ResizeObserver since it is not available to jest runner.
class ResizeObserver {
  /* eslint-disable */
  observe() {
      // do nothing
  }
  unobserve() {
      // do nothing
  }
  disconnect() {

  }
  /* eslint-enable */
}

window.ResizeObserver = ResizeObserver;

describe('TabsSlider', () => {
  describe('Default', () => {
    test('It renders basic tabs structure by default', () => {
      render(
        <TabsSlider value={0} onChange={() => null}>
          <TabsSlider.Item>
            tab 1
          </TabsSlider.Item>
        </TabsSlider>,
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
        <TabsSlider value={0} onChange={() => null}>
          <TabsSlider.Item>
            tab 1
          </TabsSlider.Item>
          <TabsSlider.Item>
            tab 2
          </TabsSlider.Item>
        </TabsSlider>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      const tabTwo = screen.getByText('tab 2').closest('button');

      expect(tabOne).toHaveClass('tab-item--selected');
      expect(tabTwo).not.toHaveClass('tab-item--selected');

      rerender(
        <TabsSlider value={1} onChange={() => null}>
          <TabsSlider.Item>
            tab 3
          </TabsSlider.Item>
          <TabsSlider.Item>
            tab 4
          </TabsSlider.Item>
        </TabsSlider>,
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
        <TabsSlider value={0} onChange={mockOnChange}>
          <TabsSlider.Item isDisabled>
            tab 1
          </TabsSlider.Item>
        </TabsSlider>,
      );

      const tabOne = screen.getByText('tab 1').closest('button');
      expect(tabOne).toHaveAttribute('disabled', '');
    });
  });

  describe('Event handlers', () => {
    test('It fires an onChange function when a TabItem is clicked', () => {
      const mockedOnChange = jest.fn(() => null);

      render(
        <TabsSlider value={0} onChange={mockedOnChange}>
          <TabsSlider.Item>
            tab 1
          </TabsSlider.Item>
          <TabsSlider.Item>
            tab 2
          </TabsSlider.Item>
        </TabsSlider>,
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
        <TabsSlider value={0} onChange={mockedOnChange}>
          <TabsSlider.Item onClick={mockedOnClick}>
            tab 1
          </TabsSlider.Item>
          <TabsSlider.Item>
            tab 2
          </TabsSlider.Item>
        </TabsSlider>,
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

  describe('Sizes', () => {
    tabsSliderSizes.forEach(size => {
      test(`renders with correct classes for size: ${size}`, () => {
        const mockedOnChange = jest.fn(() => null);
        const { getByText } = render(
          <TabsSlider value={0} onChange={mockedOnChange} size={size}>
            <TabsSlider.Item>
              tab 1
            </TabsSlider.Item>
            <TabsSlider.Item>
              tab 2
            </TabsSlider.Item>
          </TabsSlider>,
        );

        const buttonElement = getByText('tab 1');
        expect(buttonElement).toHaveClass(`p-v-${tabsSliderPaddingMap[size].split(' ')[0]}`);
      });
    });

    test('renders with correct classes for responsive size', () => {
      const mockedOnChange = jest.fn(() => null);
      const { getByText } = render(
        <TabsSlider value={0} onChange={mockedOnChange} size={{ base: 'sm', tablet: 'md', desktop: 'lg' }}>
          <TabsSlider.Item>
            tab 1
          </TabsSlider.Item>
          <TabsSlider.Item>
            tab 2
          </TabsSlider.Item>
        </TabsSlider>,
      );

      const buttonElement = getByText('tab 1');
      expect(buttonElement).toHaveClass(`p-v-${tabsSliderPaddingMap.sm.split(' ')[0]}`);
      expect(buttonElement).toHaveClass(`p-v-${tabsSliderPaddingMap.md.split(' ')[0]}-tablet`);
      expect(buttonElement).toHaveClass(`p-v-${tabsSliderPaddingMap.lg.split(' ')[0]}-desktop`);
    });
  });

  describe('States', () => {
    test('renders without tabs', () => {
      const mockedOnChange = jest.fn(() => null);
      const { getByRole } = render(
        <TabsSlider value={0} onChange={mockedOnChange} size={{ base: 'sm', tablet: 'md', desktop: 'lg' }} />,
      );

      expect(getByRole('navigation')).toBeInTheDocument();
    });

    test('updates style based on children changes', () => {
      const mockedOnChange = jest.fn(() => null);
      const { rerender, getByRole, getByText } = render(
        <TabsSlider value={0} onChange={mockedOnChange} size={{ base: 'sm', tablet: 'md', desktop: 'lg' }} />,
      );

      expect(getByRole('navigation')).toBeInTheDocument();

      rerender(
        <TabsSlider value={0} onChange={mockedOnChange} size={{ base: 'sm', tablet: 'md', desktop: 'lg' }}>
          <TabsSlider.Item>hello</TabsSlider.Item>
          ,
        </TabsSlider>,
      );

      expect(getByText('hello')).toBeInTheDocument();
    });
  });
});
