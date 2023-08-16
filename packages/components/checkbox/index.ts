import Checkbox from './src/checkbox.vue';
import CheckboxGroup from './src/checkbox-group.vue';
import { withInstall } from '@yike/utils';
export const YkCheckbox = withInstall(Checkbox);
export const YkCheckboxGroup = withInstall(CheckboxGroup);
export default YkCheckbox;
export * from './src/checkbox';
