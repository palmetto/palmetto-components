import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabPanels } from './TabPanels';

describe('Tab Panels', () => {
  test('it shows the correct panel based on the selected tab', () => {
    render(
      <TabPanels value={1}>
        <div>
          tab 1
        </div>
        <div>
          tab 2
        </div>
      </TabPanels>,
    );

    const tabOne = screen.queryByText('tab 1');
    const tabTwo = screen.queryByText('tab 2');

    expect(tabOne).not.toBeInTheDocument();
    expect(tabTwo).toBeInTheDocument();
  });
});
