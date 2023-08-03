import Image from './src/image.vue';
import ImagePreview from './src/preview.vue';
import ImagePreviewGroup from './src/preview-group.vue';
import { withInstall } from '../utils/index';

const YkImage = withInstall(Image);
const YkImagePreview = withInstall(ImagePreview);
const YkImagePreviewGroup = withInstall(ImagePreviewGroup);

export { YkImage, YkImagePreview, YkImagePreviewGroup };

export * from './src/image';
