export type ExposePaneProp = {
  name?: string | number;
  label?: string;
};
export type PaneOptionsProp = {
  id: number;
  titleSlot?: any;
} & ExposePaneProp;

export type PaneProp = PaneOptionsProp;
