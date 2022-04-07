import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './MediaModal.VisualTests.stories';

const {
  LandscapeImage,
  LandscapeImageHeaderContent,
  PortraitImageFooter,
  TitleDescriptionPortraitImage,
  PortraitImageTitleDescriptionFooter,
  WithCloseButton,
} = composeStories(stories);

describe('MediaModal', () => {
  test('renders its children', () => {
    const { getByAltText } = render(<LandscapeImage />);
    expect(getByAltText('landscape test')).toBeInTheDocument();
  });

  test('it applies the ariaLabel', () => {
    const { getByLabelText } = render(<LandscapeImage ariaLabel="label test" />);
    expect(getByLabelText('label test')).toBeInTheDocument();
  });

  test('it uses the title as the dialog aria label', () => {
    const { getByLabelText } = render(<TitleDescriptionPortraitImage />);
    expect(getByLabelText('portrait-mediamodal.jpg')).toBeInTheDocument();
  });

  test('it renders a close button', () => {
    const { getByLabelText } = render(<WithCloseButton />);
    expect(getByLabelText('close')).toBeInTheDocument();
  });

  test('renders title and description', () => {
    const { getByAltText, getByText } = render(<TitleDescriptionPortraitImage />);
    expect(getByAltText('portrait')).toBeInTheDocument();
    expect(getByText('portrait-mediamodal.jpg')).toBeInTheDocument();
    expect(getByText('Site Survey - Roof')).toBeInTheDocument();
  });

  test('renders header content', () => {
    const { getByText } = render(<LandscapeImageHeaderContent />);
    expect(getByText('header content')).toBeInTheDocument();
  });

  test('renders header content but not title and description', () => {
    const { getByText, queryByText } = render(
      <LandscapeImageHeaderContent title="test title" description="test description" />,
    );
    expect(getByText('header content')).toBeInTheDocument();
    expect(queryByText('test title')).not.toBeInTheDocument();
    expect(queryByText('test description')).not.toBeInTheDocument();
  });

  test('renders footer content', () => {
    const { getByText } = render(<PortraitImageFooter />);
    expect(getByText('footer content')).toBeInTheDocument();
  });

  test('renders title, description, and footer content', () => {
    const { getByText } = render(<PortraitImageTitleDescriptionFooter />);
    expect(getByText('title content')).toBeInTheDocument();
    expect(getByText('description content')).toBeInTheDocument();
    expect(getByText('footer content')).toBeInTheDocument();
  });
});
