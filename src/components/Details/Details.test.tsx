import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Details } from './Details';

describe('Details', () => {
  describe('Default', () => {
    test('It renders a default details HTML element and summary', () => {
      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false}>
            summary
          </Details.Summary>
        </Details>,
      );

      const details = screen.getByRole('group');
      expect(details).toBeInTheDocument();
      const summary = screen.getByText('summary');
      expect(summary).toBeInTheDocument();
    });
  });

  describe('With open details initially', () => {
    test('It renders a default details HTML element and summary', () => {
      render(
        <Details isOpen>
          <Details.Summary isDetailsOpen>
            summary
          </Details.Summary>
          <div>
            details
          </div>
        </Details>,
      );

      const details = screen.getByRole('group');
      expect(details).toBeInTheDocument();
      const summary = screen.getByText('summary');
      expect(summary).toBeInTheDocument();
      const innerDetails = screen.getByText('details');
      expect(innerDetails).toBeVisible();
    });
  });

  describe('Aria', () => {
    test('It renders the summary with the correct "button" role', () => {
      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      expect(summary).toBeInTheDocument();
      expect(summary).toHaveTextContent('summary');
    });

    test('It notes whether the underlying element is expanded', () => {
      const { rerender } = render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByText('summary');
      expect(summary).toBeInTheDocument();
      expect(summary).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <Details isOpen>
          <Details.Summary isDetailsOpen>
            summary2
          </Details.Summary>
        </Details>,
      );

      const summaryTwo = screen.getByText('summary2');
      expect(summaryTwo).toBeInTheDocument();
      expect(summaryTwo).toHaveAttribute('aria-expanded', 'true');
    });

    test('The summary is tabbable', () => {
      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      expect(summary).toBeInTheDocument();
      expect(summary).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Events', () => {
    test('it fires an onToggle when summary is clicked', () => {
      const mockedOnToggle = jest.fn(() => null);

      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false} onToggle={mockedOnToggle}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      fireEvent.click(summary);
      expect(mockedOnToggle).toHaveBeenCalledTimes(1);
    });

    test('onToggle event fires with ENTER key', () => {
      const mockedOnToggle = jest.fn(() => null);

      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false} onToggle={mockedOnToggle}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      fireEvent.keyDown(summary, { keyCode: 13 });
      fireEvent.keyDown(summary, { keyCode: 32 });
      fireEvent.keyDown(summary, { keyCode: 25 });
      expect(mockedOnToggle).toHaveBeenCalledTimes(2);
    });

    test('Does not attempt to fire onToggle if function not passed', () => {
      const mockedOnToggle = jest.fn(() => null);

      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      fireEvent.keyDown(summary, { keyCode: 13 });
      fireEvent.keyDown(summary, { keyCode: 32 });
      fireEvent.click(summary);
      expect(mockedOnToggle).toHaveBeenCalledTimes(0);
    });

    test('Fires onClick if passed', () => {
      const mockedOnToggle = jest.fn(() => null);

      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false} onClick={mockedOnToggle}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      fireEvent.click(summary);
      expect(mockedOnToggle).toHaveBeenCalledTimes(1);
    });

    test('Fires onKeyDown if passed', () => {
      const mockedOnToggle = jest.fn(() => null);

      render(
        <Details isOpen={false}>
          <Details.Summary isDetailsOpen={false} onKeyDown={mockedOnToggle}>
            summary
          </Details.Summary>
        </Details>,
      );

      const summary = screen.getByRole('button');
      fireEvent.keyDown(summary, { keyCode: 13 });

      expect(mockedOnToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Spread props', () => {
    it('takes a className and applies it to root node', () => {
      render(
        <Details isOpen={false} className="m-bottom-md">
          <Details.Summary isDetailsOpen={false} className="m-top-lg">
            summary
          </Details.Summary>
        </Details>,
      );

      const details = screen.getByRole('group');
      expect(details).toHaveClass('m-bottom-md');

      const summary = screen.getByRole('button');
      expect(summary).toHaveClass('m-top-lg');
    });
  });
});
