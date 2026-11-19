import Layout from './src/layout.vue';
import LayoutHeader from './src/layout-header.vue';
import LayoutSider from './src/layout-sider.vue';
import LayoutContent from './src/layout-content.vue';
import LayoutFooter from './src/layout-footer.vue';
import { withInstall } from '../utils';

export const YkLayout = withInstall(Layout);
export const YkLayoutHeader = withInstall(LayoutHeader);
export const YkLayoutSider = withInstall(LayoutSider);
export const YkLayoutContent = withInstall(LayoutContent);
export const YkLayoutFooter = withInstall(LayoutFooter);

export default YkLayout;
export * from './src/layout';
