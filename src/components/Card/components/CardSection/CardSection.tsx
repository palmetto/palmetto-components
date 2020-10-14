import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box from '../../../Box/Box';
import Heading from '../../../Heading/Heading';
import styles from '../../Card.module.scss';
import { CssDisplayValue, SpacingSize } from '../../../../types';

export interface CardSectionProps {
  /**
   * The amount of spacing between child elements.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   */
  childGap?: SpacingSize;
  /**
   * Elements to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to section container.
   */
  className?: string;
  /**
   * Display property. Only select values supported.
   */
  display?: CssDisplayValue;
  /**
   * visually subdued the appearance of the section
   */
  subdued?: boolean;
  /**
   * title for the section
   */
  title?: ReactNode;
}

export const CardSection: FC<CardSectionProps> = ({
  children = null,
  childGap = undefined,
  className = undefined,
  display = 'block',
  subdued = undefined,
  title = undefined,
  ...restProps
}) => {
  const backgroundColor = subdued ? 'grey-lightest' : undefined;

  const renderTitle = typeof title === 'string'
    ? (
      <Box className="m-bottom-md">
        <Heading as="h4" size="sm" variant="grey">
          {title}
        </Heading>
      </Box>
    ) : title;

  const sectionClasses = classNames(
    styles['card-section'],
    className,
  );

  return (
    <Box
      background={backgroundColor}
      className={sectionClasses}
      display={display}
      padding="md lg"
      {...restProps}
    >
      {renderTitle}
      <Box childGap={childGap}>
        {children}
      </Box>
    </Box>
  );
};

export default CardSection;
