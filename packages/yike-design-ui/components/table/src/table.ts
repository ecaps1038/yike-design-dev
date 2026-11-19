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
  store: Store<T>;
  tableId: string;
  bem: (
    elementOrModifier?: string | undefined,
    modifier?: BEMModifier | undefined,
  ) => string | string[];
}

export interface TableProps {
  data: Record<string, any>[];
  /** 表格高度，超出后纵向滚动 */
  height?: string | number;
  /** 表格最大高度，超出后纵向滚动 */
  maxHeight?: string | number;
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  /** 行数据的唯一键，用于选中状态保持 */
  rowKey?: string;
  stripe?: boolean;
  border?: boolean;
}

export interface TableColumn<T> {
  id: string;
  type: string;
  label: string;
  property: string;
  title?: string | RenderFunction;
  width?: number;
  align?: Align;
  ellipsis?: boolean;
  sortable?: boolean;
  getColumnIndex: () => number;
  index: number;
  renderCell: (data: any) => any;
  renderHeader: (data: any) => VNode;
  formatter: (
    row: T,
    column: TableColumn<T>,
    cellValue: string,
    index: number,
  ) => VNode | string;
  sortMethod?: (a: T, b: T) => number;
}

export const defaultTableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
};

export const defaultTableColumnProps = {
  type: {
    type: String,
    default: 'default',
  },
  align: {
    type: String as PropType<Align>,
    default: 'left',
  },
  property: String,
  label: String,
  width: Number,
  ellipsis: Boolean,
  sortable: Boolean,
  sortMethod: Function as PropType<TableColumn<any>['sortMethod']>,
  formatter: Function as PropType<TableColumn<any>['formatter']>,
} as const;

export const TABLE_INJECTION_KEY: InjectionKey<Table<any>> = Symbol('YkTable');

let tableIdSeed = 0;

/** 生成表格实例唯一 id（必须放在模块作用域，<script setup> 内会随实例重置） */
export const genTableId = () => `yk-table_${++tableIdSeed}`;
