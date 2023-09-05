import type { Component, App } from 'vue';

export * from './components/svg-icon';
import YkUpload from './components/upload';
import { YkRadio, YkRadioGroup } from './components/radio';
import { YkCheckbox, YkCheckboxGroup } from './components/checkbox';
import YkAnchor from './components/anchor';
import YkPopover from './components/popover';
import YkSwitch from './components/switch';
import { YkDrawer } from './components/drawer';
import { YkTable, YkTableColumn } from './components/table';
import { YkBreadcrumb, YkBreadcrumbItem } from './components/breadcrumb';
import YkBadge from './components/badge';
import YkScrollbar from './components/scrollbar';
import YkRate from './components/rate';
import YkAffix from './components/affix';
import { YkInput } from './components/input';
import { YkInputSearch } from './components/input-search';
import YkTree from './components/tree';
import YkTreeSelect from './components/tree-select';
import YkSlider from './components/slider';
import { YkCollapse, YkCollapseGroup } from './components/collapse';
import YkPopconfirm from './components/popconfirm';
import YkInputNumber from './components/input-number';
import { YkTabs, YkTabPane } from './components/tabs';
import { YkForm, YkFormItem } from './components/form';
import YkPagination from './components/pagination';
import YkTextArea from './components/text-area';
import YkTag from './components/tag';
import YkCalendar from './components/calendar';
import YkSkeleton from './components/skeleton';
import YkDivider from './components/divider';
import YkLink from './components/link';
import YkAlert from './components/alert';
import YkButton from './components/button';
import YkTheme from './components/theme';
import YkIcon from './components/icon';
import { YkAvatar, YkAvatarGroup } from './components/avatar';
import YkSpace from './components/space';
import { YkTimeline, YkTimelineItem } from './components/timeline';
import YkMessage from './components/message';
import YkNotification from './components/notification';
import { YkParagraph, YkTitle, YkText } from './components/typography';
import { YkBackTop } from './components/back-top';
import YkTooltip from './components/tooltip';
import YkEmpty from './components/empty';
import YkProgress from './components/progress';
import YkModal from './components/modal';
import { YkDropdown, YkDropdownItem } from './components/dropdown';
import {
  YkImage,
  YkImagePreview,
  YkImagePreviewGroup,
} from './components/image';
import YkSpinner from './components/spinner';
import { vLoading } from './components/spinner/src/directive';

const components: {
  [propName: string]: Component;
} = {
  YkUpload,
  YkRadioGroup,
  YkRadio,
  YkCheckbox,
  YkCheckboxGroup,
  YkSwitch,
  YkAnchor,
  YkPopover,
  YkDrawer,
  YkTable,
  YkTableColumn,
  YkProgress,
  YkBadge,
  YkScrollbar,
  YkRate,
  YkBreadcrumb,
  YkBreadcrumbItem,
  YkAffix,
  YkInput,
  YkInputSearch,
  YkTree,
  YkTreeSelect,
  YkSlider,
  YkCollapse,
  YkCollapseGroup,
  YkPopconfirm,
  YkInputNumber,
  YkTabs,
  YkTabPane,
  YkPagination,
  YkForm,
  YkFormItem,
  YkTextArea,
  YkTag,
  YkCalendar,
  YkSkeleton,
  YkDivider,
  YkLink,
  YkAlert,
  YkButton,
  YkTheme,
  YkIcon,
  YkAvatar,
  YkAvatarGroup,
  YkSpace,
  YkTimeline,
  YkTimelineItem,
  YkParagraph,
  YkTitle,
  YkText,
  YkEmpty,
  YkBackTop,
  YkTooltip,
  YkModal,
  YkDropdown,
  YkDropdownItem,
  YkImage,
  YkImagePreview,
  YkImagePreviewGroup,
  YkSpinner,
};

export {
  YkUpload,
  YkRadioGroup,
  YkRadio,
  YkProgress,
  YkBadge,
  YkCheckbox,
  YkCheckboxGroup,
  YkSwitch,
  YkAnchor,
  YkPopover,
  YkDrawer,
  YkScrollbar,
  YkRate,
  YkBreadcrumb,
  YkBreadcrumbItem,
  YkAffix,
  YkInput,
  YkInputSearch,
  YkTree,
  YkTreeSelect,
  YkSlider,
  YkCollapse,
  YkCollapseGroup,
  YkPopconfirm,
  YkInputNumber,
  YkTabs,
  YkTabPane,
  YkPagination,
  YkForm,
  YkFormItem,
  YkTextArea,
  YkTag,
  YkCalendar,
  YkSkeleton,
  YkDivider,
  YkLink,
  YkAlert,
  YkButton,
  YkTheme,
  YkIcon,
  YkParagraph,
  YkAvatar,
  YkAvatarGroup,
  YkSpace,
  YkTable,
  YkTableColumn,
  YkTimeline,
  YkTimelineItem,
  YkTitle,
  YkText,
  YkMessage,
  YkNotification,
  YkEmpty,
  YkBackTop,
  YkTooltip,
  YkModal,
  YkDropdown,
  YkDropdownItem,
  YkImage,
  YkImagePreview,
  YkImagePreviewGroup,
  YkSpinner,
};

// 全局注册
export default {
  install: (app: App) => {
    for (const c in components) {
      app.component(c, components[c]);
    }
    app.config.globalProperties.$notification = YkNotification;
    app.config.globalProperties.$message = YkMessage;
    app.directive('loading', vLoading);
  },
};
