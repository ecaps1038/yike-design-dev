export type MatchComponent = {
  pattern: RegExp;
  componentDir: string;
};

/**
 * 组件名到组件目录的映射。
 * 仅用于按需引入时定位 `style/css.js`（组件 JS 由 unplugin 从包入口解析）。
 * 新增组件时记得在这里补一条；未匹配到的组件会按 `YkFooBar -> foo-bar` 约定推导。
 */
export const matchComponents: MatchComponent[] = [
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
  { pattern: /^YkTimePicker$/, componentDir: 'time-picker' },
  { pattern: /^YkDatePicker$/, componentDir: 'date-picker' },
  {
    pattern: /^YkLayout(Header|Sider|Content|Footer)?$/,
    componentDir: 'layout',
  },
  { pattern: /^(YkRow|YkCol)$/, componentDir: 'grid' },
  { pattern: /^YkFlex$/, componentDir: 'flex' },
];
