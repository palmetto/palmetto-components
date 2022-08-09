import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { OptionTileGroup } from './OptionTileGroup';

const options = [
  { value: 'chocolate', label: 'chocolate', id: 'chocolate' },
  { value: 'strawberry', label: 'strawberry', id: 'strawberry' },
  { value: 'vanilla', label: 'vanilla', id: 'vanilla' },
];

describe('OptionTileGroup', () => {
  describe('Default', () => {
    test('it renders a radio group and radio inputs', async () => {
      render(
        <OptionTileGroup
          name="default"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
        />,
      );

      const radioInputElements = screen.getAllByRole('radio');
      expect(radioInputElements).toHaveLength(3);
    });

    test('it renders checkbox inputs if multiple elements can be selected', async () => {
      render(
        <OptionTileGroup
          name="defaultMulti"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          isMulti
        />,
      );

      const checkboxInputElements = screen.getAllByRole('checkbox');
      expect(checkboxInputElements).toHaveLength(3);
    });
  });

  describe('States', () => {
    test('radios are required', () => {
      render(
        <OptionTileGroup
          name="required"
          onChange={jest.fn()}
          options={[...options]}
          value="chocolate"
          isRequired
          title="required radios"
        />,
      );

      const selectedCheckboxOne = screen.getByLabelText('chocolate');
      const selectedCheckboxTwo = screen.getByLabelText('strawberry');
      const selectedCheckboxThree = screen.getByLabelText('vanilla');
      expect(selectedCheckboxOne).toHaveAttribute('required');
      expect(selectedCheckboxTwo).toHaveAttribute('required');
      expect(selectedCheckboxThree).toHaveAttribute('required');
    });

    test('checkboxes are required', () => {
      render(
        <OptionTileGroup
          name="required"
          onChange={jest.fn()}
          options={[...options]}
          value="chocolate"
          isRequired
          title="required checkbox"
          isMulti
        />,
      );

      const selectedCheckboxOne = screen.getByLabelText('chocolate');
      const selectedCheckboxTwo = screen.getByLabelText('strawberry');
      const selectedCheckboxThree = screen.getByLabelText('vanilla');
      expect(selectedCheckboxOne).toHaveAttribute('required');
      expect(selectedCheckboxTwo).toHaveAttribute('required');
      expect(selectedCheckboxThree).toHaveAttribute('required');
    });

    test('with option selected', () => {
      render(
        <OptionTileGroup
          name="withOptionSelected"
          onChange={jest.fn()}
          options={[...options]}
          value="chocolate"
        />,
      );

      const selectedRadio = screen.getByLabelText('chocolate');
      expect(selectedRadio).toBeChecked();
    });

    test('multi-select with option selected', () => {
      render(
        <OptionTileGroup
          name="withOptionSelectedMulti"
          onChange={jest.fn()}
          options={[...options]}
          isMulti
          value={['chocolate', 'strawberry']}
        />,
      );

      const selectedCheckboxOne = screen.getByLabelText('chocolate');
      const selectedCheckboxTwo = screen.getByLabelText('strawberry');
      expect(selectedCheckboxOne).toBeChecked();
      expect(selectedCheckboxTwo).toBeChecked();
    });

    test('with title', async () => {
      render(
        <OptionTileGroup
          name="withTitle"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          title="title"
        />,
      );

      const title = screen.getByText('title');
      expect(title).toBeInTheDocument();
    });

    test('with description', async () => {
      render(
        <OptionTileGroup
          name="withDescription"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          description="description"
        />,
      );

      const description = screen.getByText('description');
      expect(description).toBeInTheDocument();
    });

    test('with text error state', async () => {
      render(
        <OptionTileGroup
          name="withTextError"
          onChange={jest.fn()}
          options={[
            ...options,
          ]}
          value="chocolate"
          error="something went wrong"
        />,
      );

      const error = screen.getByText('something went wrong');

      expect(error).toBeInTheDocument();
    });

    test('with disabled options', async () => {
      render(
        <OptionTileGroup
          name="withDisabledOptions"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          value={null}
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('multi-select with disabled options', async () => {
      render(
        <OptionTileGroup
          name="withDisabledOptionsMulti"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          isMulti
          value={null}
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('with disabled + selected option', async () => {
      render(
        <OptionTileGroup
          name="withDisabledAndSelected"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          value="disabled"
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('multi-select with disabled + selected option', async () => {
      render(
        <OptionTileGroup
          name="multiWithDisabledOptionAndSelected"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          isMulti
          value={['disabled']}
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      expect(disabledOption).toHaveAttribute('disabled');
    });

    test('with disabled option + error', async () => {
      render(
        <OptionTileGroup
          name="withDisabledAndError"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          value="disabled"
          error
        />,
      );

      const disabledOptionRadio = screen.getByLabelText('disabled');

      expect(disabledOptionRadio).toHaveAttribute('disabled');
    });

    test('multi-select with disabled option + error', async () => {
      render(
        <OptionTileGroup
          name="multiWithDisabledAndError"
          onChange={jest.fn()}
          options={[
            ...options,
            {
              label: 'disabled',
              id: 'disabled',
              value: 'disabled',
              disabled: true,
            },
          ]}
          isMulti
          value={['disabled']}
          error
        />,
      );

      const disabledOptionCheckbox = screen.getByLabelText('disabled');

      expect(disabledOptionCheckbox).toHaveAttribute('disabled');
    });

    test('with content width (instead of fullWidth)', async () => {
      render(
        <OptionTileGroup
          name="withContentWidth"
          onChange={jest.fn()}
          options={[...options]}
          value={null}
          isFullWidth={false}
        />,
      );

      const fieldset = screen.getByRole('group');
      const container = fieldset.closest('div');
      const option = fieldset.children[0];
      expect(fieldset).toHaveClass('align-items-flex-start');
      expect(container).not.toHaveClass('w-100');
      expect(option).toHaveClass('flex-initial');
    });

    test('with custom rendered option', async () => {
      render(
        <OptionTileGroup
          name="withCustomRenderedOption"
          onChange={jest.fn()}
          options={[...options,
            {
              label: 'custom',
              id: 'custom',
              value: 'custom',
              render: () => <div>hello world!</div>,
            },
          ]}
          value={null}
          isFullWidth={false}
        />,
      );

      const customNode = screen.getByText('hello world!');
      expect(customNode).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    test('if fires an onChange method when an option is clicked', () => {
      const mockedOnChange = jest.fn();
      render(
        <OptionTileGroup
          name="onClick"
          onChange={mockedOnChange}
          options={[...options]}
          value={null}
        />,
      );

      const fieldset = screen.getByRole('group');
      const option = fieldset.children[0];

      fireEvent.click(option);
      expect(mockedOnChange).toBeCalledTimes(1);
    });

    test('if fires an onChange method input is clicked', () => {
      const mockedOnChange = jest.fn();
      render(
        <OptionTileGroup
          name="onClick"
          onChange={mockedOnChange}
          options={[...options]}
          value={null}
        />,
      );

      const firstRadio = screen.getByLabelText('chocolate');

      fireEvent.click(firstRadio);
      expect(mockedOnChange).toBeCalledTimes(2);
    });
  });
});
