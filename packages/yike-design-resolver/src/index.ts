export { YikeResolver } from './yike';
const matchComponents = [
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
  { pattern: /^YkSkeleton$/, componentDir: 'skeleton' },
  { pattern: /^YkDivider$/, componentDir: 'divider' },
  { pattern: /^YkLink$/, componentDir: 'link' },
  { pattern: /^YkAlert$/, componentDir: 'alert' },
  { pattern: /^YkButton$/, componentDir: 'button' },
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
];

export function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}
function getComponentStyleDir(importName: string) {
  if (['ConfigProvider', 'Icon'].includes(importName)) return undefined;

  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  return `@yike-design/ui/es/components/${componentDir}/style/css.js`;
}
export function sideEffects(importName: string) {
  let componentDir = kebabCase(importName);
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      componentDir = item.componentDir;
      break;
    }
  }
  return `@yike-design/ui/components/${componentDir}/style`;
}

// export function YikeResolver(options = {}) {
//   return {
//     type: 'component',
//     resolve: (name: string) => {
//       if (name.startsWith('Icon')) {
//         return {
//           name,
//           as: name,
//           from: '@yike-design/ui/es/components/svg-icon',
//         };
//       }
//       if (name.startsWith('Yk')) {
//         return {
//           name: name,
//           from: '@yike-design/ui',
//           sideEffects: getComponentStyleDir(name),
//         };
//       }
//     },
//   };
// }

const yikeSrcPath = '@yike-design/ui';

export function YikeDevResolver(compName: string) {
  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/index.ts`,
      sideEffects: sideEffects(compName),
    };
  }
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/components/svg-icon`,
    };
  }
}
