import { Ref, getCurrentInstance, ref, unref } from 'vue';
import { TableColumn, Table } from './table';

export const useStore = function <T>(dataList = []) {
  const instance = getCurrentInstance() as Table<T>;

  const data: Ref<T[]> = ref(dataList);
  const columns: Ref<TableColumn<T>[]> = ref([]);
  const selection: Ref<T[]> = ref([]);

  const state = {
    data,
    columns,
    selection,
  };

  type State = typeof state;
  const action = {
    insertColumn(state: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      array.push(column);
      sortColumn(array);
      state.columns.value = array;

      if (instance.$ready) {
        instance.store.updateColumns();
        instance.store.scheduleLayout();
      }
    },
    removeColumn(states: State, column: TableColumn<T>) {
      const array = unref(state.columns);
      const index = array.findIndex((e) => e === column);
      if (index > -1) {
        array.splice(index, 1);
      }
      sortColumn(array);
      state.columns.value = array;
    },
  };

  const dispatch = function (name: keyof typeof action, ...args) {
    const actions = instance.store.action;
    if (actions[name]) {
      actions[name].apply(instance, [instance.store.state, ...(args as [any])]);
    } else {
      throw new Error(`Action not found: ${name}`);
    }
  };

  const updateColumns = function () {
    console.log(1);
  };

  const scheduleLayout = function () {
    console.log(1);
  };

  return {
    state,
    action,
    updateColumns,
    scheduleLayout,
    dispatch,
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
