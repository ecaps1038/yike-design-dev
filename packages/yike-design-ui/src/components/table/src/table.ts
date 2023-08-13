import {
  ComponentInternalInstance,
  InjectionKey,
  PropType,
  RenderFunction,
  VNode,
} from 'vue';
import { Store } from './store';

type BEMModifier = string[] | Record<string, boolean | string | undefined>;
export type Align = 'left' | 'center' | 'right';

export interface Table<T> extends ComponentInternalInstance {
  $ready: boolean;
  store: Store<T>;
  tableId: string;
  state: any;
  bem: (
    elementOrModifier?: string | undefined,
    modifier?: BEMModifier | undefined,
  ) => string;
}

export interface TableProps {
  // id?: string;
  data: Record<string, any>[];
  height: string | number;
}

export interface TableColumn<T> {
  id: string;
  type: string;
  label: string;
  property: string;
  title?: string | RenderFunction;
  width?: number;
  align?: Align;
  fixed?: Exclude<Align, 'center'>;
  ellipsis?: boolean;
  tooltip?: boolean | Record<string, any>;
  sortable?: boolean;
  getColumnIndex: () => number;
  index: number;
  renderCell: (data: any) => any;
  formatter: (
    row: T,
    column: TableColumn<T>,
    cellValue,
    index: number,
  ) => VNode | string;
}

export const defaultTableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
};

export const TABLE_INJECTION_KEY: InjectionKey<Table<any>> = Symbol('YkTable');
