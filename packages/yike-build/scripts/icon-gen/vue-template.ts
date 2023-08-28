/* eslint-disable */
export const getIconVue = ({
  name,
  componentName,
  svgHtml,
}: {
  name: string;
  componentName: string;
  svgHtml: string;
}) =>
  `
  <script setup lang="ts">
    import { CSSProperties, computed } from 'vue'

    defineOptions({
      name: '${componentName}',
    })

    const props = withDefaults(
      defineProps<{
        size?: string | number
        strokeWidth?: number
        strokeLinecap?: 'butt' | 'round' | 'square'
        strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'
        rotate?: number
        spin?: boolean
      }>(),
      {
        strokeWidth: 0,
        strokeLinecap: 'butt',
        strokeLinejoin: 'arcs',
        size: 'inherit',
        rotate: undefined,
        spin: false,
      },
    )
    const cls = ['yk-icon', '${name}']
    const innerStyle = computed(() => {
      const styles: CSSProperties = { fill: "currentColor" }
      if (props.size) {
        styles.fontSize =
          typeof props.size === 'number' ? \`\${props.size}px\` : props.size
      }
      if (props.rotate) {
        styles.transform = \`rotate($\{props.rotate}deg)\`
      }
      return styles
    })
  </script>

  <template>
    ${svgHtml}
  </template>
`;

export const genEntryContent = ({
  imports,
  components,
}: {
  imports: string[];
  components: string[];
}) =>
  `import type { App, Plugin } from 'vue';
  ${imports.join('\n')}

  const icons: Record<string, Plugin> = {
    ${components.join(',\n  ')}
  };

  const install = (app: App) => {
    for (const key of Object.keys(icons)) {
      app.use(icons[key]);
    }
  };

  const YikeIcon = {
    ...icons,
    install
  };

  export default YikeIcon;
`;

export const genIconIndex = ({ exports }: { exports: string[] }) =>
  `export { default } from './yike-icon';
  ${exports.join('\n')}
  export type {} from './icon-components';
  `;

export const genIconType = ({ exports }: { exports: string[] }) =>
  `// @ts-nocheck

  declare module 'vue' {
    export interface GlobalComponents {
  ${exports.map((item) => `${' '.repeat(4)}${item}`).join('\n')}
    }
  }

  export {};
`;

export const genComponentIndex = ({
  name,
  componentName,
}: {
  name: string;
  componentName: string;
}) => `
  import _${componentName} from './${name}.vue';
  import { withInstall } from '../../utils/index';
  const ${componentName} = withInstall(_${componentName});
  export default ${componentName};
`;
