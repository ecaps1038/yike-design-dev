export const toBoolean = (v: number | string | boolean) => {
  if (typeof v === 'boolean') return v;

  return !!v.toString();
};
export const isArray = (v: any): v is any[] => {
  return Array.isArray(v);
};
export const isUndefined = (v: any) => {
  return typeof v === 'undefined';
};
