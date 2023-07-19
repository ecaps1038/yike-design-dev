import Empty from './src/empty.vue';
import { withInstall } from '@yike/utils';
import DEFAULT_EMPTY from '../../assets/img/yk-empty-default.svg';
import ADVANCED_EMPTY from '../../assets/img/yk-empty-advanced.svg';
export const YkEmpty = {
  ...withInstall(Empty),
  DEFAULT_EMPTY,
  ADVANCED_EMPTY,
};
export default YkEmpty;
export * from './src/empty';
