import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './Button.constants';

describe('Button', () => {
  describe('html button type', () => {
    test('is set to button', () => {
      render(<Button>Button</Button>);
      const testBtn = screen.getByRole('button');
      expect(testBtn.getAttribute('type')).toBe('button');
    });

    test('is set to "submit" if specified', () => {
      render(<Button type="submit">Submit Button</Button>);

      const testBtn = screen.getByRole('button');
      expect(testBtn.getAttribute('type')).toBe('submit');
    });

    test('is set to "reset" if specified', () => {
      render(<Button type="reset">Reset Button</Button>);

      const testBtn = screen.getByRole('button');
      expect(testBtn.getAttribute('type')).toBe('reset');
    });

    test('is not set if "as" prop is an anchor tag', () => {
      render(
        <Button as="a" href="https://www.palmetto.com">
          link button
        </Button>,
      );
      const testBtn = screen.getByText('link button').parentElement;
      expect(testBtn).not.toHaveAttribute('type');
    });
  });

  describe('with Icon', () => {
    test('Renders an icon prefix if specified', () => {
      render(<Button iconPrefix="alarm">Alarm Button</Button>);
      expect(screen.getByTestId('prefixIcon')).toBeInTheDocument();
    });

    test('Renders an icon suffix if specified', () => {
      render(<Button iconSuffix="alarm">Alarm Button</Button>);
      expect(screen.getByTestId('suffixIcon')).toBeInTheDocument();
    });

    test('Renders icon prefix and suffix if specified', () => {
      render(
        <Button iconPrefix="alarm" iconSuffix="check">
          Suffix Prefix Icon Button
        </Button>,
      );
      expect(screen.getByTestId('prefixIcon')).toBeInTheDocument();
      expect(screen.getByTestId('suffixIcon')).toBeInTheDocument();
    });
    test('Renders gap between icon and text', () => {
      render(<Button iconSuffix="alarm">Alarm Button</Button>);
      expect(
        screen.getByText('Alarm Button').parentElement.classList,
      ).toContain('g-xs');
    });
    test('Renders smaller gap between icon and text for xs sized buttons', () => {
      render(
        <Button size="xs" iconSuffix="alarm">
          Alarm Button
        </Button>,
      );
      expect(
        screen.getByText('Alarm Button').parentElement.classList,
      ).toContain('g-2xs');
    });
  });

  describe('Sizes', () => {
    BUTTON_SIZES.map(size =>
      describe(`${BUTTON_SIZES}`, () => {
        test(`it has a ${size} class applied to it`, () => {
          render(<Button size={size}>{`${size} Button`}</Button>);

          const btn = screen.getByText(`${size} Button`).closest('button');

          expect(btn.getAttribute('class')).toContain(`size-${size}`);
        });
      }),
    );

    test('It applies responsive classes', () => {
      render(
        <Button size={{ base: 'xs', tablet: 'sm', desktop: 'md', hd: 'lg' }}>
          button
        </Button>,
      );

      const btn = screen.getByText('button').closest('button');

      expect(btn.getAttribute('class')).toContain('size-xs');
      expect(btn.getAttribute('class')).toContain('size-sm-tablet');
      expect(btn.getAttribute('class')).toContain('size-md-desktop');
      expect(btn.getAttribute('class')).toContain('size-lg-hd');
    });
  });

  describe('Variants', () => {
    BUTTON_VARIANTS.map(variant =>
      describe(`${BUTTON_VARIANTS}`, () => {
        test(`it has a ${variant} class applied to it`, () => {
          render(<Button variant={variant}>{`${variant} Button`}</Button>);

          const btn = screen.getByText(`${variant} Button`).closest('button');

          expect(btn.getAttribute('class')).toContain(variant);
        });
      }),
    );
  });

  describe('Callback Handling', () => {
    describe('onClick', () => {
      test('it fires onClick callback', () => {
        const mockedHandleClick = jest.fn();

        render(<Button onClick={mockedHandleClick}>Click</Button>);

        fireEvent.click(screen.getByText('Click').closest('button'));

        expect(mockedHandleClick).toBeCalledTimes(1);
      });

      test('it does not fire function if onClick callback not provided', () => {
        const mockedHandleClick = jest.fn();

        render(<Button>Click</Button>);

        fireEvent.click(screen.getByText('Click').closest('button'));

        expect(mockedHandleClick).toBeCalledTimes(0);
      });

      test('it prevents default event behavior if specified by onClick', async () => {
        const mockedHandleClick = jest.fn(event => event.preventDefault());
        const mockedNavigate = jest.fn(() => null);

        render(
          <Button navigate={mockedNavigate} onClick={mockedHandleClick}>
            Click
          </Button>,
        );
        fireEvent.click(screen.getByText('Click').closest('button'));

        expect(mockedHandleClick).toBeCalledTimes(1);
        expect(mockedNavigate).not.toBeCalled();
      });
    });

    describe('onFocus', () => {
      test('it fires onFocus callback', () => {
        const mockedHandleFocus = jest.fn();

        render(<Button onFocus={mockedHandleFocus}>Focus</Button>);

        fireEvent.focus(screen.getByText('Focus').closest('button'));

        expect(mockedHandleFocus).toBeCalledTimes(1);
      });

      test('it does not fire function of onFocus callback not provided', () => {
        const mockedHandleFocus = jest.fn();

        render(<Button>Focus</Button>);

        fireEvent.focus(screen.getByText('Focus').closest('button'));

        expect(mockedHandleFocus).toBeCalledTimes(0);
      });
    });

    describe('onBlur', () => {
      test('it fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();

        render(<Button onBlur={mockedHandleBlur}>Blur</Button>);

        fireEvent.blur(screen.getByText('Blur').closest('button'));

        expect(mockedHandleBlur).toBeCalledTimes(1);
      });

      test('it does not fire onBlur callback if not provided', () => {
        const mockedHandleBlur = jest.fn();

        render(<Button>Blur</Button>);

        fireEvent.blur(screen.getByText('Blur').closest('button'));

        expect(mockedHandleBlur).toBeCalledTimes(0);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders the button with simple text', () => {
        render(<Button>Button!</Button>);
        const buttonElement = screen.getByText('Button!');

        expect(buttonElement).toBeInTheDocument();
      });

      test('it renders the button with nested dom nodes', () => {
        render(
          <Button>
            <div className="buttonLoadingIndicator">
              <div>Im a nested dom node!</div>
            </div>
          </Button>,
        );
        const buttonElement = screen.getByText('Im a nested dom node!');

        expect(buttonElement).toBeInTheDocument();
      });

      test('it does not have a disabled attribute', () => {
        render(<Button>Not Disabled Button</Button>);

        expect(
          screen.getByText('Not Disabled Button').closest('button'),
        ).not.toBeDisabled();
      });

      test('it renders an empty button when no children are passed', () => {
        render(<Button />);
        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.innerText).toBe(undefined);
      });
    });

    describe('Full Width', () => {
      test('it has a fullWidth class applied to it', () => {
        render(<Button fullWidth>Full Width Button</Button>);

        const fullWidthBtn = screen
          .getByText('Full Width Button')
          .closest('button');

        expect(fullWidthBtn.getAttribute('class')).toContain('full-width');
      });
    });

    describe('Custom ClassName', () => {
      test('if a ClassName is provided, its added to the button', () => {
        render(<Button className="custom-class">Custom ClassName</Button>);

        const customClassNameBtn = screen
          .getByText('Custom ClassName')
          .closest('button');

        expect(customClassNameBtn.getAttribute('class')).toContain(
          'custom-class',
        );
      });
    });

    describe('Disabled', () => {
      test('it has a disabled attribute', () => {
        render(<Button isDisabled>Disabled Button</Button>);

        expect(
          screen.getByText('Disabled Button').closest('button'),
        ).toBeDisabled();
      });
    });

    describe('Loading', () => {
      test('it renders the spinning loading indicator', () => {
        render(<Button isLoading>Button is loading</Button>);
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveClass('font-color-dark');
      });

      test('it renders the grey spinning indicator if button variant is secondary-neutral', () => {
        render(
          <Button isLoading variant="secondary-neutral">
            Button is loading
          </Button>,
        );
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveClass('font-color-dark');
      });

      test('it keeps the button text in the dom so the button width does not change', () => {
        render(<Button isLoading>Button is loading</Button>);
        expect(screen.getByText('Button is loading')).toBeInTheDocument();
      });

      test('it renders white spinning indicator when button is primary', () => {
        render(
          <Button variant="primary" isLoading>
            Button is loading
          </Button>,
        );
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveClass('font-color-white');
      });

      test('it renders white spinning indicator when button is primary-danger', () => {
        render(
          <Button variant="primary-danger" isLoading>
            Button is loading
          </Button>,
        );
        const spinnerElement = document.getElementsByClassName('spinner')[0];
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveClass('font-color-white');
      });
    });

    describe('Disabled and Loading', () => {
      test('it has a disabled attribute', () => {
        render(
          <Button isDisabled isLoading>
            Disabled and Loading Button
          </Button>,
        );

        expect(
          screen.getByText('Disabled and Loading Button').closest('button'),
        ).toBeDisabled();
      });
    });

    describe('Color Variations', () => {
      test('Renders button with default variant neutral', () => {
        render(<Button>primary</Button>);

        expect(screen.getByText('primary').closest('button')).toHaveClass(
          'primary-neutral',
        );
      });

      const variants = ['primary', 'success', 'danger', 'light', 'dark'];
      variants.forEach(variant => {
        test(`It renders component with variant: ${variant} when passed`, () => {
          render(<Button variant={variant}>{variant}</Button>);
          expect(screen.getByText(variant).closest('button')).toHaveClass(
            variant,
          );
        });
      });
    });

    describe('Anchor', () => {
      test('it renders an anchor tag if as prop `a` is passed', () => {
        render(
          <Button href="http://palmetto.com" as="a">
            hey there
          </Button>,
        );
        const buttonElement = screen.getByRole('link');

        expect(buttonElement).toBeInTheDocument();
      });

      test('it does not have a button type attribute if as prop `a` is passed', () => {
        render(
          <Button href="http://palmetto.com" as="a">
            hey there
          </Button>,
        );
        const buttonElement = screen.getByRole('link');

        expect(buttonElement.getAttribute('type')).toBe(null);
      });

      test('it renders a target attribute if one is passed, the element is an anchor, and there is a href', () => {
        render(
          <Button href="http://palmetto.com" as="a" target="_blank">
            hey there
          </Button>,
        );
        const buttonElement = screen.getByRole('link');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute('target');
      });

      test('it does not render a target attribute if the element is not an anchor', () => {
        render(
          <Button href="http://palmetto.com" target="_blank">
            hey there
          </Button>,
        );
        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).not.toHaveAttribute('target');
      });

      test('it does not render a target attribute if the element does not have an href', () => {
        render(
          <Button as="a" target="_blank">
            hey there
          </Button>,
        );
        const buttonElement = screen.getByText('hey there');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).not.toHaveAttribute('target');
      });
    });
  });

  describe('React Router', () => {
    it('fires navigate callback when included', () => {
      const mockedNavigate = jest.fn(() => {});
      render(
        <Button as="a" navigate={mockedNavigate} href="/">
          react router link
        </Button>,
      );

      fireEvent.click(screen.getByText('react router link').closest('a'));

      expect(mockedNavigate).toBeCalledTimes(1);
    });

    it('does not fire navigate callback if target is _blank', () => {
      const mockedNavigate = jest.fn(() => {});
      render(
        <Button as="a" navigate={mockedNavigate} href="/" target="_blank">
          react router link
        </Button>,
      );

      fireEvent.click(screen.getByText('react router link').closest('a'));

      expect(mockedNavigate).toBeCalledTimes(0);
    });
  });
});
