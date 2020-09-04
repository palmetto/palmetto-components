import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Alert.module.scss';

interface AlertProps {
  /**
   * The text message or ReactNode to be rendered in the alert.
   */
  message: string | ReactNode;
  /**
   * The type/color of the alert to show.
   */
  type: 'info' | 'success' | 'warning' | 'danger';
}
const Alert: FC<AlertProps> = ({
  message,
  type = undefined,
}) => {
  const alertClasses = classNames(
    styles.alert,
    { [type ? styles[type] : null]: !!type },
  );

  return (
    <div className={alertClasses}>
      {message}
    </div>
  );
};

export default Alert;
