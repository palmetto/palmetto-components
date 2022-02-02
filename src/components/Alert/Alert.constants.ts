import { IconName } from '../../types';
import { AlertVariant } from './Alert.types';

// eslint-disable-next-line import/prefer-default-export
export const ALERT_VARIANTS: AlertVariant[] = ['info', 'success', 'warning', 'danger', 'default'];

export const ALERT_ICONS_MAP: { [key in AlertVariant]: { icon: IconName; } } = {
  default: { icon: 'c-warning' },
  info: { icon: 'c-info' },
  success: { icon: 'c-check' },
  warning: { icon: 't-warning' },
  danger: { icon: 'c-remove' },
};
