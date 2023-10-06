import Form from './src/form.vue';
import FormItem from './src/form-item.vue';
import { withInstall } from '../utils';

export const YkForm = withInstall(Form);
export const YkFormItem = withInstall(FormItem);
export default YkForm;
export * from './src/form';
