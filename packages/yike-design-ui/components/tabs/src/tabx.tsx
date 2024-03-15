import {
  computed,
  defineComponent,
  getCurrentInstance,
  renderSlot,
  provide,
  reactive,
  readonly,
  ref,
  PropType,
} from 'vue'
import { PaneOptionsProp } from './pane'
import { TabsProps, YkTabsProvideKey } from './tabs'
import { createCssScope } from '../../utils'
import YkTabNav from './tab-nav.vue'

export default defineComponent({
  name: 'YkTabs',
  props: {
    modelValue: {
      type: [Number, String],
      default: '',
    },
    type: {
      type: String as PropType<TabsProps['type']>,
      default: 'line',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    tabPosition: {
      type: String as PropType<TabsProps['tabPosition']>,
      default: 'top',
    },
  },
  emits: ['update:modelValue', 'add', 'delete', 'change'],
  setup(props, { emit, slots }) {
    const ns = createCssScope('tabs')
    const { uid } = getCurrentInstance()!

    const paneOptions = ref<PaneOptionsProp[]>([])

    const activedId = computed(() => {
      if (props.modelValue === undefined) {
        return paneOptions.value[0]?.id
      }
      const active = paneOptions.value.find((i) => i.name === props.modelValue)

      return active?.id
    })

    const onNavChange = (v: PaneOptionsProp) => {
      emit('change', v.name)
      emit('update:modelValue', v.name)
    }

    const destroyPane = (id: number) => {
      paneOptions.value = paneOptions.value.filter((i) => i.id !== id)
    }
    const onDel = (v: PaneOptionsProp) => {
      emit('delete', { name: v.name, label: v.label, disabled: v.disabled })
    }
    provide(
      YkTabsProvideKey,
      reactive({
        paneOptions,
        id: uid,
        activedId,
        rootProps: readonly(props),
        destroyPane,
        updateActive: onNavChange,
      }),
    )
    return () => {
      const header = (
        <YkTabNav
          type={props.type}
          onChange={onNavChange}
          onAdd={() => emit('add')}
          onDelete={onDel}
        ></YkTabNav>
      )
      const pannes = (
        <div class={ns('panes__container')}>{renderSlot(slots, 'default')}</div>
      )
      return (
        <div class={ns()}>
          {props.tabPosition !== 'bottom' ? [header, pannes] : [pannes, header]}
        </div>
      )
    }
  },
})
