import { InjectionKey } from 'vue';
import { PaneOptionsProp } from './pane';

export type TabsProps = {
  modelValue?: number | string;
  type?: 'line' | 'card';
  closable?: boolean;
  addable?: boolean;
  editable?: boolean;
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
};

export type TabInjectOption = {
  paneOptions: PaneOptionsProp[];
  id: number;
  activedId?: number;
  rootProps?: TabsProps;
  destroyPane?: (id: number) => void;
  updateActive?: (item: PaneOptionsProp) => void;
};
export const YkTabsProvideKey: InjectionKey<TabInjectOption> =
  Symbol('YkTabsProvideKey');
