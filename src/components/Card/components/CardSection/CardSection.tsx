import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box from '../../../Box/Box';
import Heading from '../../../Heading/Heading';
import styles from '../../Card.module.scss';
import { PALMETTO_SPACING } from '../../../../lib/tokens';

export interface CardSectionProps {
  /**
   * Custom class to be applied to section container.
   */
  className?: string;
  /**
   * The amount of spacing between child elements.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   */
  childGap?: PALMETTO_SPACING;
  /**
   * Elements to be rendered.
   */
  children?: ReactNode;
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
  children,
  childGap,
  className,
  subdued,
  title,
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
