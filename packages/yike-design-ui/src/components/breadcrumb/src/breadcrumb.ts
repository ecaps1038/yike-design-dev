import { InjectionKey, Slots } from 'vue';

export type BreadcrumbProps = {
  // id?: string;
  separator?: string;
  // separatorIcon?: string;
};

export type BreadcrumbItemProps = {
  to?: string;
};

interface Key {
  props: BreadcrumbProps;
  slots: Slots;
}
export const breadcrumbName: InjectionKey<Key> = Symbol('breadcrumbName');
