import React from 'react';
import { render } from '@testing-library/react';
import { MediaModal } from './MediaModal';

describe('Modal', () => {
  test('renders its children', () => {
    const { getByText } = render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <MediaModal isOpen onDismiss={() => {}} ariaLabel="testDefault">
        test modal
      </MediaModal>,
    );
    expect(getByText('test modal')).toBeInTheDocument();
  });
});
