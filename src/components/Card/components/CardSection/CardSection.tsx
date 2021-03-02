import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../../../Box/Box';
import Heading from '../../../Heading/Heading';
import styles from '../../Card.module.scss';

export interface CardSectionProps extends BoxProps {
  /**
   * Contents of the Section.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to section container.
   */
  className?: string;
  /**
   * Visually subdued the appearance of the section.
   */
  subdued?: boolean;
  /**
   * Title for the section.
   */
  title?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const CardSection: FC<CardSectionProps> = ({
  background = undefined,
  children = null,
  childGap = undefined,
  className = undefined,
  display = 'block',
  padding = 'md lg',
  subdued = undefined,
  title = undefined,
  ...restProps
}) => {
  const backgroundColor = subdued ? 'grey-lightest' : background;

  const renderTitle = typeof title === 'string' ? (
    <Box className="m-bottom-md">
      <Heading as="h4" size="sm" variant="grey">
        {title}
      </Heading>
    </Box>
  ) : (
    title
  );

  const sectionClasses = classNames(styles['card-section'], className);

  return (
    <Box
      background={backgroundColor}
      className={sectionClasses}
      display={display}
      padding={padding}
      {...restProps}
    >
      {renderTitle}
      <Box childGap={childGap}>{children}</Box>
    </Box>
  );
};

export default CardSection;
