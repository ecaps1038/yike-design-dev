import { defineComponent, getCurrentInstance, h, inject } from 'vue';
import { TABLE_INJECTION_KEY } from './table';
// import {Ykcheck} from '../../../index';

export default defineComponent({
  components: {
    // YkCheckbox,
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
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
      data.map((row, index) => {
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
            return h('td', { class: [bem('cell')] }, [tdChildren]);
          }),
        );
      }),
    );
  },
});
