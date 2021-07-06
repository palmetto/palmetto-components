import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  describe('Default', () => {
    test('It renders a default details HTML element and summary', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen={false}>
            <Accordion.PanelSummary isDetailsOpen={false}>summary</Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
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
        <Accordion>
          <Accordion.Panel isOpen>
            <Accordion.PanelSummary isDetailsOpen>summary</Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const details = screen.getByRole('group');
      expect(details).toBeInTheDocument();
      const summary = screen.getByText('summary');
      expect(summary).toBeInTheDocument();
      const innerDetails = screen.getByText('details');
      expect(innerDetails).toBeVisible();
    });
  });

  describe('Caret', () => {
    test('It renders with the caret on the right by default', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen={false}>
            <Accordion.PanelSummary isDetailsOpen={false}>summary</Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.getByTestId('icon-testid--caret-sm-down');
      expect(icon).toBeInTheDocument();
    });

    test('It renders with the caret on the right by default pointing down when open', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen>
            <Accordion.PanelSummary isDetailsOpen>summary</Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.getByTestId('icon-testid--caret-sm-up');
      expect(icon).toBeInTheDocument();
    });

    test('It renders with the caret on the right and pointing down when open and prop passed', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen>
            <Accordion.PanelSummary isDetailsOpen hasCaret="right">summary</Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.getByTestId('icon-testid--caret-sm-up');
      expect(icon).toBeInTheDocument();
    });

    test('It renders with the caret pointing right when placed on the left and closed', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen={false}>
            <Accordion.PanelSummary isDetailsOpen={false} hasCaret="left">
              summary
            </Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.getByTestId('icon-testid--caret-sm-right');
      expect(icon).toBeInTheDocument();
    });

    test('It renders with the caret pointing down when placed on the left and open', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen>
            <Accordion.PanelSummary isDetailsOpen hasCaret="left">
              summary
            </Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.getByTestId('icon-testid--caret-sm-down');
      expect(icon).toBeInTheDocument();
    });

    test('It renders with no caret if hasCaret prop set to false', () => {
      render(
        <Accordion>
          <Accordion.Panel isOpen>
            <Accordion.PanelSummary isDetailsOpen hasCaret={false}>
              summary
            </Accordion.PanelSummary>
            <Accordion.PanelDetails>details</Accordion.PanelDetails>
          </Accordion.Panel>
        </Accordion>,
      );

      const icon = screen.queryByTestId('icon-testid--caret-sm-up');
      expect(icon).not.toBeInTheDocument();
    });
  });
});
