import { computed, defineComponent, h, inject } from 'vue';
import { TABLE_INJECTION_KEY } from './table';
import type { SortState } from './store';

export default defineComponent({
  setup() {
    const parent = inject(TABLE_INJECTION_KEY);
    const store = parent!.store;
    const columnList = store?.state.columns;

    const rows = computed(() => {
      const data = [...(store?.state.data.value || [])];
      const sort = store?.state.sort.value as SortState;
      if (!sort.order || !sort.columnId) return data;

      const column = columnList.value.find((item) => item.id === sort.columnId);
      if (!column) return data;

      const order = sort.order === 'desc' ? -1 : 1;
      return data.sort((a, b) => {
        if (column.sortMethod) {
          return column.sortMethod(a, b) * order;
        }
        const aValue = column.property
          ? (a as Record<string, unknown>)[column.property]
          : '';
        const bValue = column.property
          ? (b as Record<string, unknown>)[column.property]
          : '';
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * order;
        }
        return String(aValue ?? '').localeCompare(String(bValue ?? '')) * order;
      });
    });

    return {
      store,
      columnList,
      rows,
      bem: parent!.bem,
    };
  },
  render() {
    const { columnList, rows, bem } = this;
    const data = rows;

    return h(
      'tbody',
      {
        class: [bem('body')],
      },
      data.map((row, index) => {
        return h(
          'tr',
          {
            class: [bem('row')],
          },
          columnList.map((column) => {
            const cellData = {
              row,
              index,
              column,
            };
            const tdChildren = column.renderCell(cellData);
            return h(
              'td',
              {
                class: [bem('cell'), `text-${column.align}`],
                style: column.width
                  ? { width: `${column.width}px` }
                  : undefined,
              },
              [tdChildren],
            );
          }),
        );
      }),
    );
  },
});
