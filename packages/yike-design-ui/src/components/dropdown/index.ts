import Dropdown from './src/dropdown.vue';
import DropdownItem from './src/dropdown-item.vue';
import { withInstall } from '../utils/index';

export const YkDropdown = withInstall(Dropdown);
export const YkDropdownItem = withInstall(DropdownItem);
export default { YkDropdown, YkDropdownItem };
export * from './src/dropdown';
