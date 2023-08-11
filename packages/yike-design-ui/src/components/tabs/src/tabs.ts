import { InjectionKey } from 'vue';
import { PaneOptionsProp } from './pane';

export type TabsProps = {
  id?: string;
  modelValue?: number | string;
};

export type TabInjectOption = {
  paneOptions: PaneOptionsProp[];
  id: number;
  activedId?: number;
};
export const YkTabsProvideKey: InjectionKey<TabInjectOption> =
  Symbol('YkTabsProvideKey');
