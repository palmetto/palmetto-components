import React from 'react';
import { screen, render } from '@testing-library/react';
import { createComponent } from './createComponent';
import { Box } from '../../components/Box/Box';

describe('Default', () => {
  it('Renders a custom component from a base HTML element', () => {
    const MyComponent = createComponent(Box)({
      background: 'info',
    });

    render(<MyComponent>hello</MyComponent>);

    const myDiv = screen.getByText('hello');

    expect(myDiv).toHaveClass('background-color-info');
  });

  it('Overwrites props from an existing custom component', () => {
    const BaseComponent = createComponent(Box)({
      background: 'info',
    });

    render(<BaseComponent background="danger">hello</BaseComponent>);

    const myDiv = screen.getByText('hello');

    expect(myDiv).toHaveClass('background-color-danger');
  });
});
