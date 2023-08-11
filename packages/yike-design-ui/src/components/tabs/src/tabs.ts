import { InjectionKey } from 'vue';
import { PaneOptionsProp } from './pane';

export type TabsProps = {
  id?: string;
};

export type TabInjectOption = {
  paneOptions: PaneOptionsProp[];
};
export const YkTabsProvideKey: InjectionKey<TabInjectOption> =
  Symbol('YkTabsProvideKey');
