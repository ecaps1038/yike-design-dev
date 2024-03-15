import {
  ComponentInternalInstance,
  VNode,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import { TableColumn, defaultTableColumnProps } from './table';
import { YkCheckbox } from '../../checkbox';

let columnIdSeed = 1;
export default defineComponent({
  name: 'YkTableColumn',
  components: {
    YkCheckbox,
  },
  props: defaultTableColumnProps,
  setup(props, { slots }) {
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const columnConfig = ref<Partial<TableColumn<any>>>({});
    const columnId = `column_${columnIdSeed++}`;

    const owner = computed(() => {
      let parent = instance.parent as any;
      while (parent && !parent?.tableId) {
        parent = parent.parent;
      }
      return parent;
    });

    const store = owner.value.store;
    type Row = (typeof store.state.data)[number];
    const defaultRenderCell = ({
      row,
      column,
      index,
    }: {
      row: Row;
      column: TableColumn<Row>;
      index: number;
    }) => {
      const property = column.property;
      const value = property && row[property];
      if (column && column.type == 'checkbox') {
        return h(YkCheckbox, {
          checked: store.isSelected(row),
          onChange(val) {
            store.dispatch('toggleRowSelection', row, val);
          },
        });
      }
      if (column && column.formatter) {
        return column.formatter(row, column, value, index);
      }
      return value?.toString?.() || '';
    };

    onBeforeMount(() => {
      columnConfig.value = {
        id: columnId,
        type: props.type,
        align: props.align,
        property: props.property,
        label: props.label,
        formatter: props.formatter,
        renderCell: (data) => {
          let children: VNode | null = null;
          if (slots.default) {
            const vnodes = slots.default(data);
            children = vnodes.some((v) => v.type !== Comment)
              ? vnodes
              : defaultRenderCell(data);
          } else {
            children = defaultRenderCell(data);
          }
          return h('div', { class: ['cell'] }, [children]);
        },
        renderHeader: ({ column, index }) => {
          const renderHeader = slots.header;
          let children: VNode | null = null;
          if (column.type === 'checkbox') {
            children = h(YkCheckbox, {
              checked: store.state.isAllSelected.value,
              indeterminate:
                store.state.selection.value.length > 0 &&
                !store.state.isAllSelected.value,
              onChange: (val) => {
                store.dispatch('toggleAllSelection', val);
              },
            });
          } else {
            children = column.label;
          }
          return h('div', { class: 'cell' }, [
            renderHeader ? renderHeader({ column, index }) : children,
          ]);
        },
      };
    });

    onMounted(() => {
      const children = owner.value.refs.hiddenColumns?.children;
      const getColumnIndex = () =>
        Array.from(children).findIndex((e) => e == instance.vnode.el);

      columnConfig.value.getColumnIndex = getColumnIndex;
      const columnIndex = getColumnIndex();
      if (columnIndex > -1) {
        owner.value.store.dispatch('insertColumn', columnConfig.value);
      }
    });

    onBeforeUnmount(() => {
      owner.value.store.dispatch('removeColumn', columnConfig.value);
    });

    return {
      columnId,
      columnConfig,
    };
  },
  render() {
    const renderDefault = this.$slots.default?.({
      row: {},
      column: {},
      $index: -1,
    });
    if (renderDefault) {
      return h('div', renderDefault);
    } else {
      return h('div', []);
    }
  },
});
