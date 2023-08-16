import Breadcrumb from './src/breadcrumb.vue';
import BreadcrumbItem from './src/breadcrumb-item.vue';
import { withInstall } from '@yike/utils';
export const YkBreadcrumb = withInstall(Breadcrumb);
export const YkBreadcrumbItem = withInstall(BreadcrumbItem);
export default YkBreadcrumb;
export * from './src/breadcrumb';
