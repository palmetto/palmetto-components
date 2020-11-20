import { FC } from 'react';
import { IconName } from '../types';
import UserIcon from './UserIcon';

const icons: { [icon in IconName]: FC } = {
  user: UserIcon,
};

export default icons;
