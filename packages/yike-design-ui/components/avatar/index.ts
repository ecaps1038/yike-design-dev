import Avatar from './src/avatar.vue';
import AvatarGroup from './src/avatar-group.vue';
import { withInstall } from '../utils';

export const YkAvatar = withInstall(Avatar);
export const YkAvatarGroup = withInstall(AvatarGroup);
export default YkAvatar;
export * from './src/avatar';
