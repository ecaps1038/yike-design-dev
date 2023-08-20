// import Tabs from './src/tabs.vue';
import Tabs from './src/tabx';
import TabPane from './src/tab-pane.vue';
import { withInstall } from '../utils/index';
export const YkTabs = withInstall(Tabs);
export const YkTabPane = withInstall(TabPane);
export default YkTabs;
export * from './src/tabs';
