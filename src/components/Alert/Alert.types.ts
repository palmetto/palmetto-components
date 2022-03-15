import { BrandColor, FontColor, IconName } from '../../types';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'default';

export type AlertAttributes = { icon: IconName; color: FontColor; background: BrandColor; };
