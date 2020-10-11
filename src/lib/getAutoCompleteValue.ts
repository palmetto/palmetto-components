function getAutoCompleteValue(value: string | boolean):string {
  if (!value || (typeof value !== 'boolean' && typeof value !== 'string')) {
    return 'off';
  }

  if (typeof value === 'boolean' && value) {
    return 'on';
  }

  return value;
}

export default getAutoCompleteValue;
