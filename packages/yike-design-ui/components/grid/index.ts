import Row from './src/row.vue';
import Col from './src/col.vue';
import { withInstall } from '../utils';

export const YkRow = withInstall(Row);
export const YkCol = withInstall(Col);

export default YkRow;
export * from './src/grid';
