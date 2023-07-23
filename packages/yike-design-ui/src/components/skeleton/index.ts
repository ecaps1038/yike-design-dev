import Skeleton from './src/skeleton.vue';
import SkeletonLine from './src/skeleton-line.vue';
import SkeletonShape from './src/skeleton-shape.vue';
import { withInstall } from '@yike/utils';

export const YkSkeleton = withInstall(Skeleton);
export const YkSkeletonLine = withInstall(SkeletonLine);
export const YkSkeletonShape = withInstall(SkeletonShape);
export * from './src/skeleton';
