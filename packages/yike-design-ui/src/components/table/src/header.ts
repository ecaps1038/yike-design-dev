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

    const store = parent?.store;
    const columnList = store?.state.columns;

    return {
      columnList,
      bem: parent!.bem,
    };
  },
  render() {
    const { columnList, bem } = this;
    return h(
      'thead',
      {
        class: [bem('header')],
      },
      h(
        'tr',
        {},
        columnList?.map((column, index) => {
          return h(
            'th',
            {
              class: [bem('cell')],
            },
            [h('div', { class: ['cell'] }, column.label)],
          );
        }),
      ),
    );
  },
});
