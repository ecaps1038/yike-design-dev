import { defineComponent, h, inject } from 'vue';
import { TABLE_INJECTION_KEY } from './table';

export default defineComponent({
  setup() {
    const parent = inject(TABLE_INJECTION_KEY);
    const store = parent!.store;
    const columnList = store?.state.columns;

    return {
      store,
      columnList,
      bem: parent!.bem,
    };
  },
  render() {
    const { columnList, store, bem } = this;
    const data = store?.state.data.value || [];

    return h(
      'tbody',
      {
        class: [bem('body')],
      },
      data.map((row) => {
        return h(
          'tr',
          {
            class: [bem('row')],
          },
          columnList.map((column, index) => {
            const data = {
              row,
              index,
              column,
            };
            const tdChildren = column.renderCell(data);
            return h('td', { class: [bem('cell'), `text-${column.align}`] }, [
              tdChildren,
            ]);
          }),
        );
      }),
    );
  },
});
