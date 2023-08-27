import Table from './src/table.vue';
import TableColumn from './src/column';
import { withInstall } from '../utils/index';
export const YkTable = withInstall(Table);
export const YkTableColumn = withInstall(TableColumn);
export default YkTable;
export * from './src/table';
