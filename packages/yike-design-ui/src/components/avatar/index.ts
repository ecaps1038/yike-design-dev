import Avatar from './src/avatar.vue';
import AvatarGroup from './src/avatar-group.vue';
import { withInstall } from '../../utils/index';

export const YkAvatar = withInstall(Avatar);
export const YkAvatarGroup = withInstall(AvatarGroup);

export * from './src/avatar';
