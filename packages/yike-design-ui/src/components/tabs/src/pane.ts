export type PaneProp = {
  name?: string | number;
  label?: string;
  disabled?: boolean;
};
export type PaneOptionsProp = {
  id: number;
  titleSlot?: any;
} & PaneProp;
