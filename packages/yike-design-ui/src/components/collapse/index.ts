import Collapse from './src/collapse.vue';
import collapseGroup from './src/collapse-group.vue';
import { withInstall } from '../utils/index';
export const YkCollapse = withInstall(Collapse);
export const YkCollapseGroup = withInstall(collapseGroup);
export * from './src/collapse';
