import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { OptionTiles } from './OptionTiles';

const options = [
  { value: 'chocolate', label: 'chocolate', id: 'chocolate' },
  { value: 'strawberry', label: 'strawberry', id: 'strawberry' },
  { value: 'vanilla', label: 'vanilla', id: 'vanilla' },
];

describe('OptionTiles', () => {
  describe('Default', () => {
    test('it renders a radio group and radio inputs', async () => {
      render(
        <OptionTiles
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
        <OptionTiles
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
    test('required', () => {
      render(
        <OptionTiles
          name="required"
          onChange={jest.fn()}
          options={[...options]}
          value="chocolate"
          isRequired
          title="title"
        />,
      );

      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
    });

    test('with option selected', () => {
      render(
        <OptionTiles
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
        <OptionTiles
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
        <OptionTiles
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
        <OptionTiles
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

    test('with boolean error state', async () => {
      render(
        <OptionTiles
          name="withBooleanError"
          onChange={jest.fn()}
          options={[
            ...options,
          ]}
          value="chocolate"
          error
        />,
      );

      const selectedOptionContainer = screen.getByRole('group').children[0];

      expect(selectedOptionContainer).toHaveClass('background-color-danger-lightest');
    });

    test('with text error state', async () => {
      render(
        <OptionTiles
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

    test('with title + error', async () => {
      render(
        <OptionTiles
          name="withTitleAndError"
          onChange={jest.fn()}
          options={[
            ...options,
          ]}
          value="chocolate"
          title="title"
          error
        />,
      );

      const selectedOptionContainer = screen.getByRole('group').children[1];
      const title = screen.getByText('title');
      
      expect(title).toHaveClass('font-color-danger');
      expect(selectedOptionContainer).toHaveClass('background-color-danger-lightest');
    });


    test('multi-select with error', async () => {
      render(
        <OptionTiles
          name="multiWithError"
          onChange={jest.fn()}
          options={[
            ...options,
          ]}
          isMulti
          value={["chocolate"]}
          error
        />,
      );

      const selectedOptionContainer = screen.getByRole('group').children[0];

      expect(selectedOptionContainer).toHaveClass('background-color-danger-lightest');
    });

    test('with disabled options', async () => {
      render(
        <OptionTiles
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
        <OptionTiles
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
        <OptionTiles
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
      const disabledOptionContainer = screen.getByRole('group').children[3];
      expect(disabledOption).toHaveAttribute('disabled');
      expect(disabledOptionContainer).toHaveClass('background-color-grey-lightest');
      expect(disabledOptionContainer).toHaveClass('border-color-grey-light');
    });

    test('multi-select with disabled + selected option', async () => {
      render(
        <OptionTiles
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
          value={["disabled"]}
        />,
      );

      const disabledOption = screen.getByLabelText('disabled');
      const disabledOptionContainer = screen.getByRole('group').children[3];
      expect(disabledOption).toHaveAttribute('disabled');
      expect(disabledOptionContainer).toHaveClass('background-color-grey-lightest');
      expect(disabledOptionContainer).toHaveClass('border-color-grey-light');
    });

    test('with disabled option + error', async () => {
      render(
        <OptionTiles
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
      const disabledOptionContainer = screen.getByRole('group').children[3];

      expect(disabledOptionRadio).toHaveAttribute('disabled');
      expect(disabledOptionContainer).toHaveClass('background-color-danger-lightest');
    });

    test('multi-select with disabled option + error', async () => {
      render(
        <OptionTiles
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
          value={["disabled"]}
          error
        />,
      );

      const disabledOptionCheckbox = screen.getByLabelText('disabled');
      const disabledOptionContainer = screen.getByRole('group').children[3];

      expect(disabledOptionCheckbox).toHaveAttribute('disabled');
      expect(disabledOptionContainer).toHaveClass('background-color-danger-lightest');
    });

    test('with content width (instead of fullWidth)', async () => {
      render(
        <OptionTiles
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
        <OptionTiles
          name="withCustomRenderedOption"
          onChange={jest.fn()}
          options={[...options, { label: 'custom', id: 'custom', value: 'custom', render: () => <div>hello world!</div> }]}
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
        <OptionTiles
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
        <OptionTiles
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
