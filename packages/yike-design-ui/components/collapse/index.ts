import Collapse from './src/collapse.vue';
import collapseGroup from './src/collapse-group.vue';
import { withInstall } from '../utils';

export const YkCollapse = withInstall(Collapse);
export const YkCollapseGroup = withInstall(collapseGroup);
export default YkCollapse;
export * from './src/collapse';
