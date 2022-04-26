import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './Drawer.VisualTests.stories';

const { RightDrawer, RightDrawerClose, RightDrawerTitleClose } = composeStories(stories);

describe('Drawer', () => {
  test('renders its children', () => {
    const { getByText } = render(<RightDrawerTitleClose />);
    expect(getByText('Right Drawer')).toBeInTheDocument();
  });

  test('it applies the aria label', () => {
    const { getByLabelText } = render(<RightDrawerTitleClose />);
    expect(getByLabelText('Right Drawer')).toBeInTheDocument();
  });

  test('it renders a close button and title', () => {
    const { getByText, getByLabelText } = render(<RightDrawerTitleClose />);
    expect(getByLabelText('close')).toBeInTheDocument();
    expect(getByText('Right Drawer')).toBeInTheDocument();
  });

  test('it renders a close button without title', () => {
    const { getByLabelText } = render(<RightDrawerClose />);
    expect(getByLabelText('close')).toBeInTheDocument();
  });

  test('it open and closes based on isOpen prop', () => {
    const { queryByLabelText, getByLabelText, rerender } = render(<RightDrawer isOpen={false} />);

    expect(queryByLabelText('Right Drawer')).toBe(null);

    rerender(<RightDrawer />);

    expect(getByLabelText('Right Drawer')).toBeInTheDocument();
  });
});
