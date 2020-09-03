import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Alert.module.scss';

interface AlertProps {
  /**
   * The text message or ReactNode to be rendered in the alert.
   */
  message: string | ReactNode,
}
const Alert: FC<AlertProps> = ({
  message,
}) => {
  const alertClasses = classNames(
    styles.alert,
  );

  return (
    <div className={alertClasses}>
      {message}
    </div>
  );
};

export default Alert;
