import { Ref, getCurrentInstance, ref, unref } from 'vue';
import { TableColumn, Table } from './table';

export type SortOrder = 'asc' | 'desc' | null;

export type SortState = {
  columnId?: string;
  property?: string;
  order: SortOrder;
};

export const useStore = function <T>(dataList: T[] = []) {
  const instance = getCurrentInstance() as Table<T>;

  const data = ref(dataList) as Ref<T[]>;
  const columns: Ref<TableColumn<T>[]> = ref([]);
  const selection: Ref<T[]> = ref([]);
  const isAllSelected = ref(false);
  const rowKey: Ref<string | undefined> = ref(undefined);
  const sort: Ref<SortState> = ref({ order: null });

  const state = {
    data,
    columns,
    selection,
    isAllSelected,
    rowKey,
    sort,
  };

  type State = typeof state;

  /** 行唯一键：配置了 rowKey 时取字段值，否则使用行对象本身 */
  const getRowKey = (row: T): unknown => {
    const key = state.rowKey.value;
    return key ? (row as Record<string, unknown>)[key] : row;
  };

  const isRowSelected = (row: T) =>
    state.selection.value.some((item) => getRowKey(item) === getRowKey(row));

  const syncIsAllSelected = (state: State) => {
    state.isAllSelected.value =
      state.data.value.length > 0 &&
      state.data.value.every((row) =>
        state.selection.value.some(
          (item) => getRowKey(item) === getRowKey(row),
        ),
      );
  };

  const action = {
    insertColumn(state: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      array.push(column);
      sortColumn(array);
      state.columns.value = [...array];
    },
    removeColumn(state: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      const index = array.findIndex((e) => e === column);
      if (index > -1) {
        array.splice(index, 1);
      }
      sortColumn(array);
      state.columns.value = [...array];
    },
    setRowKey(state: State, key?: string) {
      state.rowKey.value = key;
    },
    toggleRowSelection(state: State, row: T, selected: boolean) {
      const selection = [...unref(state.selection)];
      const index = selection.findIndex(
        (item) => getRowKey(item) === getRowKey(row),
      );
      const included = index !== -1;

      if (selected && !included) {
        selection.push(row);
      } else if (!selected && included) {
        selection.splice(index, 1);
      }

      state.selection.value = selection;
      syncIsAllSelected(state);

      const newSelection = selection.slice();
      instance.emit('select', newSelection, row);
      instance.emit('selection-change', newSelection);
    },
    toggleAllSelection(state: State, selected: boolean) {
      const rows = state.data.value || [];
      if (selected) {
        const next = [...state.selection.value];
        rows.forEach((row) => {
          if (!next.some((item) => getRowKey(item) === getRowKey(row))) {
            next.push(row);
          }
        });
        state.selection.value = next;
      } else {
        state.selection.value = [];
      }
      syncIsAllSelected(state);
      const newSelection = state.selection.value.slice();
      instance.emit('select-all', newSelection);
      instance.emit('selection-change', newSelection);
    },
    clearSelection(state: State) {
      state.selection.value = [];
      syncIsAllSelected(state);
      instance.emit('selection-change', []);
    },
    toggleSort(state: State, column: TableColumn<T>) {
      const current = state.sort.value;
      const isSameColumn = current.columnId === column.id;
      let order: SortOrder;
      if (!isSameColumn) order = 'asc';
      else if (current.order === 'asc') order = 'desc';
      else if (current.order === 'desc') order = null;
      else order = 'asc';

      state.sort.value = order
        ? { columnId: column.id, property: column.property, order }
        : { order: null };
      instance.emit('sort-change', {
        column,
        prop: column.property,
        order,
      });
    },
  };

  const dispatch = function (name: keyof typeof action, ...args: any[]) {
    const actions = instance.store.action as any;
    if (actions[name]) {
      actions[name](instance.store.state, ...args);
    } else {
      throw new Error(`Action not found: ${name}`);
    }
  };

  const isSelected = function (row: T) {
    return isRowSelected(row);
  };

  return {
    state,
    action,
    dispatch,
    isSelected,
    getRowKey,
  };
};

function sortColumn<T>(array: TableColumn<T>[]) {
  array.forEach((item) => {
    item.index = item.getColumnIndex?.();
  });
  array.sort((cur, pre) => cur.index - pre.index);
}

class HelperStore<T> {
  Return = useStore<T>();
}

type Store<T> = HelperStore<T>['Return'];

export type { Store };
