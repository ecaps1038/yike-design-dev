import { defineComponent, h, inject } from 'vue';
import { TABLE_INJECTION_KEY } from './table';
import { YkCheckbox } from '../../checkbox';

export default defineComponent({
  components: {
    YkCheckbox,
  },
  setup() {
    const parent = inject(TABLE_INJECTION_KEY);

    const store = parent?.store;
    const columnList = store?.state.columns;

    return {
      store,
      columnList,
      bem: parent!.bem,
    };
  },
  render() {
    const { columnList, bem, store } = this;
    return h(
      'thead',
      {
        class: [bem('header')],
      },
      h(
        'tr',
        {},
        columnList?.map((column, index) => {
          const sort = store?.state.sort.value;
          const ariaSort =
            sort && sort.columnId === column.id && sort.order
              ? sort.order === 'asc'
                ? 'ascending'
                : 'descending'
              : undefined;
          return h(
            'th',
            {
              class: [bem('cell'), `text-${column.align}`],
              style: column.width ? { width: `${column.width}px` } : undefined,
              'aria-sort': ariaSort,
            },
            column.renderHeader({ column, index }),
          );
        }),
      ),
    );
  },
});
