import type { ComponentInfo, ComponentResolver } from './types';
import { isExclude } from './_utils';

export const matchComponents = [
  { pattern: /^YkUpload$/, componentDir: 'upload' },
  { pattern: /^(YkRadio|YkRadioGroup)$/, componentDir: 'radio' },
  { pattern: /^(YkCheckbox|YkCheckboxGroup)$/, componentDir: 'checkbox' },
  { pattern: /^YkAnchor$/, componentDir: 'anchor' },
  { pattern: /^YkPopover$/, componentDir: 'popover' },
  { pattern: /^YkSwitch$/, componentDir: 'switch' },
  { pattern: /^YkDrawer$/, componentDir: 'drawer' },
  { pattern: /^(YkTable|YkTableColumn)$/, componentDir: 'table' },
  { pattern: /^(YkBreadcrumb|YkBreadcrumbItem)$/, componentDir: 'breadcrumb' },
  { pattern: /^YkBadge$/, componentDir: 'badge' },
  { pattern: /^YkScrollbar$/, componentDir: 'scrollbar' },
  { pattern: /^YkRate$/, componentDir: 'rate' },
  { pattern: /^YkAffix$/, componentDir: 'affix' },
  { pattern: /^YkInput$/, componentDir: 'input' },
  { pattern: /^YkInputSearch$/, componentDir: 'input-search' },
  { pattern: /^YkTree$/, componentDir: 'tree' },
  { pattern: /^YkTreeSelect$/, componentDir: 'tree-select' },
  { pattern: /^YkSlider$/, componentDir: 'slider' },
  { pattern: /^YkCollapse$/, componentDir: 'collapse' },
  { pattern: /^YkCollapseGroup$/, componentDir: 'collapse' },
  { pattern: /^YkPopconfirm$/, componentDir: 'popconfirm' },
  { pattern: /^YkInputNumber$/, componentDir: 'input-number' },
  { pattern: /^(YkTabs|YkTabPane)$/, componentDir: 'tabs' },
  { pattern: /^(YkForm|YkFormItem)$/, componentDir: 'form' },
  { pattern: /^YkInputTag$/, componentDir: 'input-tag' },
  { pattern: /^YkPagination$/, componentDir: 'pagination' },
  { pattern: /^YkTextArea$/, componentDir: 'text-area' },
  { pattern: /^YkTag$/, componentDir: 'tag' },
  { pattern: /^YkCalendar$/, componentDir: 'calendar' },
  { pattern: /^YkCalendarMin$/, componentDir: 'calendar' },
  { pattern: /^YkSkeleton$/, componentDir: 'skeleton' },
  { pattern: /^YkDivider$/, componentDir: 'divider' },
  { pattern: /^YkLink$/, componentDir: 'link' },
  { pattern: /^YkAlert$/, componentDir: 'alert' },
  { pattern: /^YkButton$/, componentDir: 'button' },
  { pattern: /^YkSelect$/, componentDir: 'select' },
  { pattern: /^YkTheme$/, componentDir: 'theme' },
  { pattern: /^YkIcon$/, componentDir: 'icon' },
  { pattern: /^(YkAvatar|YkAvatarGroup)$/, componentDir: 'avatar' },
  { pattern: /^YkSpace$/, componentDir: 'space' },
  { pattern: /^(YkTimeline|YkTimelineItem)$/, componentDir: 'timeline' },
  { pattern: /^YkMessage$/, componentDir: 'message' },
  { pattern: /^YkNotification$/, componentDir: 'notification' },
  { pattern: /^(YkParagraph|YkTitle|YkText)$/, componentDir: 'typography' },
  { pattern: /^YkBackTop$/, componentDir: 'back-top' },
  { pattern: /^YkTooltip$/, componentDir: 'tooltip' },
  { pattern: /^YkEmpty$/, componentDir: 'empty' },
  { pattern: /^YkProgress$/, componentDir: 'progress' },
  { pattern: /^YkModal$/, componentDir: 'modal' },
  { pattern: /^(YkDropdown|YkDropdownItem)$/, componentDir: 'dropdown' },
  {
    pattern: /^(YkImage|YkImagePreview|YkImagePreviewGroup)$/,
    componentDir: 'image',
  },
  { pattern: /^YkSpinner$/, componentDir: 'spinner' },
  { pattern: /^vLoading$/, componentDir: 'directive' },
  { pattern: /^YkTimePicker$/, componentDir: 'time-picker' },
];
export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $2').trim();
  return result.split(' ').join('-').toLowerCase();
}
export function pascalCase(str: string) {
  return capitalize(camelCase(str));
}

export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getComponentStyleDir(
  importName: string,
  importStyle: boolean | 'css' | 'less',
) {
  if (['ConfigProvider', 'Icon'].includes(importName)) return undefined;

  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  if (importStyle === 'less') {
    return `@yike-design/ui/es/components/${componentDir}/style/index.js`;
  }
  if (importStyle === 'css' || importStyle) {
    return `@yike-design/ui/es/components/${componentDir}/style/index.css`;
  }
}

function canResolveIcons(
  options?: ResolveIconsOption,
): options is AllowResolveIconOption {
  if (options === undefined) return false;
  if (typeof options === 'boolean') return options;
  else return options.enable;
}

function getResolveIconPrefix(options?: ResolveIconsOption) {
  if (canResolveIcons(options)) {
    if (typeof options === 'boolean' && options) return '';
    else if (options.enable) return options.iconPrefix ?? '';
    else return '';
  }
  return '';
}

export type DisallowResolveIconOption = undefined | false | { enable: false };
export type AllowResolveIconOption =
  | true
  | { enable: true; iconPrefix?: string };
export type ResolveIconsOption =
  | DisallowResolveIconOption
  | AllowResolveIconOption;

export interface YikeResolverOptions {
  /**
   * exclude components that do not require automatic import
   *
   * @default []
   */
  exclude?: string | RegExp | (string | RegExp)[];
  /**
   * import style css or less with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'less';
  /**
   * resolve icons
   *
   * @default false
   */
  resolveIcons?: ResolveIconsOption;
  /**
   * Control style automatic import
   *
   * @default true
   */
  sideEffect?: boolean;
}

/**
 * Resolver for Yike Design Vue
 *
 * Requires @yike-design/ui@0.0.11 or later
 *
 * @author @flsion
 * @link https://Yike.design/ for Yike-design
 *
 */
export function YikeResolver(
  options: YikeResolverOptions = {},
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Icon')) {
        const config = {
          name,
          as: name,
          from: '@yike-design/ui/es/components/svg-icon',
        };
        return config;
      }
      if (name.match(/^Yk[A-Z]/) && !isExclude(name, options.exclude)) {
        const importStyle = options.importStyle ?? 'css';

        const importName = name;
        const config: ComponentInfo = {
          name: importName,
          from: '@yike-design/ui',
        };
        if (options.sideEffect !== false)
          config.sideEffects = getComponentStyleDir(importName, importStyle);
        return config;
      }
    },
  };
}
