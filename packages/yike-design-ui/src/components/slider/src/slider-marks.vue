<script lang="ts">
import { h, VNode, computed } from 'vue'
import { SliderMark } from './slider'
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    percentStart: {
      type: Number,
      default: 0,
    },
    percentEnd: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    function renderMarkItem(item: SliderMark): VNode {
      const markInfo =
        item.titleNode || h('span', { style: item.style }, item.label)
      const isOver = computed(() => {
        const percent = item.percent / 100
        return (
          percent === props.percentStart ||
          percent === props.percentEnd + props.percentStart
        )
      })
      const isOvered = computed(() => {
        const percent = item.percent / 100
        return (
          percent > props.percentStart &&
          percent < props.percentEnd + props.percentStart
        )
      })
      return h(
        'div',
        {
          class: {
            'yk-slider__mark-item': true,
            'yk-slider__mark-item--over': isOver.value,
            'yk-slider__mark-item--overed': isOvered.value,
          },
          style: {
            left: item.percent + '%',
          },
        },
        [
          h('div', {
            class: 'yk-slider__mark-item--pointer',
            onclick: () => emit('position', item.percent),
          }),
          h(
            'div',
            {
              class: 'yk-slider__mark-item--box',
              onclick: () => emit('position', item.percent),
            },
            markInfo,
          ),
        ],
      )
    }
    return () =>
      h(
        'div',
        {
          class: 'yk-slider__marks',
        },
        (props.modelValue as SliderMark[]).map((i) => renderMarkItem(i)),
      )
  },
}
</script>

<style lang="scss" scoped></style>
