import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../../../Box/Box';
import Heading from '../../../Heading/Heading';
import styles from '../../Card.module.scss';

export interface CardSectionProps extends BoxProps {
  /**
   * visually subdue the appearance of the section
   */
  subdue?: boolean;
  /**
   * title for the section
   */
  title?: ReactNode;
}

export const CardSection: FC<CardSectionProps> = ({
  children,
  childGap,
  className,
  subdue,
  padding = 'md lg',
  title,
  ...restProps
}) => {
  const backgroundColor = subdue ? 'grey-lightest' : null;

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
      padding={padding}
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
