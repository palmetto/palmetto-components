import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { Placement } from '@popperjs/core';
import { Popover } from './Popover';

describe('Popover', () => {
  describe('Default', () => {
    it('Renders a popover with default props', async () => {
      // NOTE: popperJS is throwing a warning due to missing act, but it is unclear how to fix these.
      // https://github.com/popperjs/react-popper/issues/368
      render(<Popover isOpen content={<>hello</>}><p>trigger</p></Popover>);

      const popoverContent = screen.getByText('hello');
      const popoverContainer = screen.getByRole('dialog');
      const trigger = screen.getByText('trigger');
      expect(popoverContent).toBeInTheDocument();
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('role', 'button');
      expect(popoverContainer).toBeInTheDocument();
      expect(popoverContainer).toHaveAttribute('role', 'dialog');
      expect(popoverContainer).toHaveAttribute('aria-hidden', 'false');
      expect(popoverContainer).toHaveClass('background-color-white');
      expect(popoverContainer).toHaveClass('p-sm');
      await waitFor(() => expect(popoverContainer).toHaveAttribute('data-popper-placement', 'right'));
    });
  });

  describe('Callbacks', () => {
    it('Fires a callback when a user clicks outside the popover', () => {
      const mockedOnClickOutside = jest.fn();
      const { container } = render(
        <Popover
          isOpen
          content={<>hello</>}
          onClickOutside={mockedOnClickOutside}
        >
          <p>trigger</p>
        </Popover>,
      );

      const popover = screen.getByText('hello');
      const trigger = screen.getByText('trigger');
      expect(popover).toBeInTheDocument();
      fireEvent.click(popover);
      fireEvent.click(trigger);
      fireEvent.click(container);
      fireEvent.keyUp(container, { key: 'Escape' });
      expect(mockedOnClickOutside).toBeCalledTimes(2);
    });
  });

  describe('Placement', () => {
    // We do not test auto placements since those compute out to one of the below after detection.
    const positions: Placement[] = [
      'top',
      'bottom',
      'right',
      'left',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'right-start',
      'right-end',
      'left-start',
      'left-end',
    ];

    positions.forEach(position => {
      it(`Places the tooltop correctly in position: ${position} when prop is passed`, async () => {
        render(<Popover isOpen content={<>hello</>} placement={position}><p>trigger</p></Popover>);

        const popoverContainer = screen.getByRole('dialog');
        await waitFor(() => expect(popoverContainer).toHaveAttribute('data-popper-placement', position));
      });
    });
  });

  describe('Portal', () => {
    it('Renders the Popover in the body if withPortal is true.', async () => {
      render(
        <>
          <div id="nest1">
            <div id="nest2">
              <Popover
                isOpen
                content={<button type="button" id="inside-button">hello</button>}
                withPortal
                portalTarget={document.body}
              >
                <p>trigger</p>
              </Popover>
            </div>
          </div>
        </>,
      );

      await waitFor(() => { expect(document.body.children[1]).toHaveAttribute('data-popper-placement', 'right'); });
    });
  });
});
