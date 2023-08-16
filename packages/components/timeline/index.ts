import Timeline from './src/timeline.vue';
import TimelineItem from './src/timeline-item.vue';
import { withInstall } from '@yike/utils';

export const YkTimeline = withInstall(Timeline);
export const YkTimelineItem = withInstall(TimelineItem);
export default YkTimeline;
