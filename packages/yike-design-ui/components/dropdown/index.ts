import Dropdown from './src/dropdown.vue';
import DropdownItem from './src/dropdown-item.vue';
import { withInstall } from '../utils';

export const YkDropdown = withInstall(Dropdown);
export const YkDropdownItem = withInstall(DropdownItem);
export * from './src/dropdown';
export default YkDropdown;
