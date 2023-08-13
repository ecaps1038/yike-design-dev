import { Ref, getCurrentInstance, ref, unref } from 'vue';
import { TableColumn, Table } from './table';

export const useStore = function <T>(dataList = []) {
  const instance = getCurrentInstance() as Table<T>;

  const data: Ref<T[]> = ref(dataList);
  const columns: Ref<TableColumn<T>[]> = ref([]);
  const selection: Ref<T[]> = ref([]);
  const isAllSelected = ref(false);

  const state = {
    data,
    columns,
    selection,
    isAllSelected,
  };

  type State = typeof state;
  const action = {
    insertColumn(state: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      array.push(column);
      sortColumn(array);
      state.columns.value = array;
    },
    removeColumn(state: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      const index = array.findIndex((e) => e === column);
      if (index > -1) {
        array.splice(index, 1);
      }
      sortColumn(array);
      state.columns.value = array;
    },
    toggleRowSelection(state: State, row: T, selected: boolean) {
      const selection = unref(state.selection);
      const index = selection.indexOf(row);
      const included = index !== -1;

      if (selected && !included) {
        selection.push(row);
      } else if (!selected && included) {
        selection.splice(index, 1);
      }

      state.selection.value = selection;

      if (state.data.value.length === selection.length) {
        state.isAllSelected.value = true;
      } else {
        state.isAllSelected.value = false;
      }

      const newSelection = (state.selection.value || []).slice();
      instance.emit('select', newSelection, row);
      instance.emit('selection-change', newSelection);
    },
    toggleAllSelection(state: State, selected: boolean) {
      state.data.value.forEach((row) => {
        this.toggleRowSelection(state, row, selected);
      });

      instance.emit('select-all', selection.value);
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
    return selection.value.includes(row);
  };

  return {
    state,
    action,
    dispatch,
    isSelected,
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
