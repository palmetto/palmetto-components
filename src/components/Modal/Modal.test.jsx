/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

describe('Modal', () => {
  test('it renders its chlidren', () => {
    const { getByText } = render(
      <Modal isOpen onDismiss={() => null}>test modal</Modal>,
    );
    expect(getByText('test modal')).toBeInTheDocument();
  });
});
