import Image from './src/image.vue';
import ImagePreview from './src/preview.vue';
import ImagePreviewGroup from './src/preview-group.vue';
import { withInstall } from '../utils';

export const YkImage = withInstall(Image);
export const YkImagePreview = withInstall(ImagePreview);
export const YkImagePreviewGroup = withInstall(ImagePreviewGroup);
export default YkImage;
export * from './src/image';
