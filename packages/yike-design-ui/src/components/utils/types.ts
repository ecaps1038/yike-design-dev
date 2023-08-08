import { RenderFunction, VNode } from 'vue';
import Form from '../form/src/form.vue';
export type RenderContent = string | RenderFunction | VNode;

export type Key = string | number;

export type FormInstance = InstanceType<typeof Form>;
