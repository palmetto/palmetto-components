export type AlertTokenName =
  '--alert-default-background-color'|
  '--alert-default-font-color'|
  '--alert-default-icon-color'|
  '--alert-info-background-color' |
  '--alert-info-font-color'|
  '--alert-info-icon-color'|
  '--alert-success-background-color' |
  '--alert-success-font-color' |
  '--alert-success-icon-color' |
  '--alert-warning-background-color' |
  '--alert-warning-font-color'|
  '--alert-warning-icon-color' |
  '--alert-danger-background-color' |
  '--alert-danger-font-color'|
  '--alert-danger-icon-color';

export const AlertTokens: { [key in AlertTokenName]: string | number } = {
  '--alert-default-background-color': 'var(--color-brand-grey-100)',
  '--alert-default-font-color': 'var(--color-brand-grey-600)',
  '--alert-default-icon-color': 'var(--color-brand-grey-600)',

  '--alert-info-background-color': 'var(--color-brand-info-50)',
  '--alert-info-font-color': 'var(--color-brand-grey-600)',
  '--alert-info-icon-color': 'var(--color-brand-info-500)',

  '--alert-success-background-color': 'var(--color-brand-success-50)',
  '--alert-success-font-color': 'var(--color-brand-grey-600)',
  '--alert-success-icon-color': 'var(--color-brand-success-500)',

  '--alert-warning-background-color': 'var(--color-brand-warning-50)',
  '--alert-warning-font-color': 'var(--color-brand-grey-600)',
  '--alert-warning-icon-color': 'var(--color-brand-warning-500)',

  '--alert-danger-background-color': 'var(--color-brand-danger-50)',
  '--alert-danger-font-color': 'var(--color-brand-grey-600)',
  '--alert-danger-icon-color': 'var(--color-brand-danger-500)',
};
